from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny

from responses import OK, NOT_FOUND, ERR
from user.models import cUser
from . import models
from . import serializers

from utils.paginator import pagination_wrapper
from utils.languages import LANGUAGES

class LanguangeRecordView(APIView):
    def get(self, req):
        return Response(data=LANGUAGES, status=OK)


class PaginatedSongView(APIView):
    def get(self, req, page: int, order_by: str):
        res = pagination_wrapper(
            models.Song,
            {},
            serializers.SongSerializer,
            {},
            page,
            16,
            order_by
        )

        return Response(data={'results': res[0], 'next_page': res[1]}, status=OK)
    
class PaginatedUserSongsView(APIView):
    def get(self, req, page: int, id: int, order_by: str):
        res = pagination_wrapper(
            models.Song,
            {'user_id': id},
            serializers.SongSerializer,
            {},
            page,
            16,
            order_by
        )

        return Response(data={'results': res[0], 'next_page': res[1]}, status=OK)

class UploadSongView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req):
        data = req.POST
        files = req.FILES
       
        try:
            new_song = models.Song.objects.create(
                user        = cUser.objects.get(id=req.user.id),
                title       = data['title'],
                tags        = data['tags[]'], 
                thumbnail   = files['thumbnail'],
                audio       = files['audio']
            )

            # Data is received as lyric[English], lyric[Armenian], ...
            for key in data.keys():
                if key.startswith('lyric'):
                    models.SongLyrics.objects.create(
                        song_id     = new_song.id,
                        lyrics      = data[key],
                        language    = key.split('[')[1][:-1],
                    )

            return Response(data={'id': new_song.id}, status=OK)
        except Exception as e:
            print(e)
            return Response(status=ERR)
        
class EditSongView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, id: int):
        data = req.POST
        files = req.FILES
       
        song = models.Song.objects.get(id = id)
        song.title = data['title']
        song.save()

        song_lyrics = models.SongLyrics.objects.filter(song_id=id)
        song_lyric_languages = [x.language for x in song_lyrics]

        # Data is received as lyric[English], lyric[Armenian], ...
        for key in data.keys():
            if key.startswith('lyric'):
                language = key.split('[')[1][:-1]
                if language not in song_lyric_languages: # If the language does not exist, then create
                    models.SongLyrics.objects.create(
                        song_id     = song.id,
                        lyrics      = data[key],
                        language    = key.split('[')[1][:-1],
                    )
                    song_lyric_languages.remove(language)

                else: # If the language exists, then update
                    lyric = models.SongLyrics.objects.get(
                            song_id  = song.id,
                            language = key.split('[')[1][:-1]
                        )
                    lyric.lyrics = data[key]
                    lyric.save()
                    
                    song_lyric_languages.remove(language)

        # The remaining languages have been deleted, we know this because we looped through all the languages list
        # and removed the language from the list after creating/updating
        # the remaining languages are the ones that were deleted.
        for language in song_lyric_languages:
            models.SongLyrics.objects.get(
                song_id  = song.id,
                language = language
            ).delete()

        return Response(status=OK)
    
class DeleteSongView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, req, id: int):
        song = models.Song.objects.get(id=id)
        if song.user.id == req.user.id:
            song.delete()

            return Response(status=OK)
        return Response(status=ERR)

class ViewedSongView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, id: int):
        song = models.Song.objects.get(id=id)
        viewed_song, _ = models.ViewedSong.objects.get_or_create(
                user    = cUser.objects.get(id=req.user.id),
                song_id = id
            )
        
        viewed_song.amount_viewed += 1
        song.views += 1

        song.save()
        viewed_song.save()

        return Response(status=OK)
    
class SongLyricView(APIView):
    permission_classes = [AllowAny]

    def get(self, req, id: int, language: str):
        lyrics = models.SongLyrics.objects.get(song_id=id, language=language).lyrics

        return Response(data=lyrics, status=OK)

class AllSongLyricsView(APIView):
    permission_classes = [AllowAny]

    def get(self, req, id: int):
        all_lyrics = models.SongLyrics.objects.filter(song_id=id)
        data = {}

        for x in all_lyrics:
            data[x.language] = x.lyrics

        return Response(data=data, status=OK)

    
# ========================================
# User page views

class PaginatedUserUploadedSongView(APIView):
    def get(self, req, page: int, id: int):
        res = pagination_wrapper(
            models.Song,
            {'user_id', id},
            serializers.SongSerializer,
            {},
            page,
            30
        )

        return Response(data={'results': res[0], 'next_page': res[1]}, status=OK)
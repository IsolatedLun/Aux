from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

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
    def get(self, req, page: int):
        res = pagination_wrapper(
            models.Song,
            {},
            serializers.SongSerializer,
            {},
            page,
            30
        )

        return Response(data={'results': res[0], 'next_page': res[1]}, status=OK)
    
class UploadSongView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req):
        data = req.POST
        files = req.FILES
       
        try:
            new_song = models.Song.objects.create(
                user=cUser.objects.get(id=req.user.id),
                title=data['title'],
                tags=data['tags[]'], 
                thumbnail=files['thumbnail'],
                audio=files['audio']
            )

            return Response(data={'id': new_song.id}, status=OK)
        except Exception as e:
            print(e)
            return Response(status=ERR)

class ViewedSongView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, id: int):
        song = models.Song.objects.get(id=id)
        viewed_song, _ = models.ViewedSong.objects.get_or_create(
                user=cUser.objects.get(id=req.user.id),
                song_id=id
            )
        
        viewed_song.amount_viewed += 1
        song.views += 1

        song.save()
        viewed_song.save()

        return Response(status=OK)
    
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
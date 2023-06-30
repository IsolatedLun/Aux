from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from responses import OK, NOT_FOUND, ERR
from . import models
from . import serializers
from utils.paginator import pagination_wrapper
from user.models import cUser


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
    def post(self, req):
        data = req.POST
        files = req.FILES
       
        try:
            new_song = models.Song.objects.create(
                user=cUser.objects.get(id=1),
                title=data['title'],
                tags=data['tags[]'], 
                thumbnail=files['thumbnail'],
                audio=files['audio']
            )

            return Response(data={'id': new_song.id}, status=OK)
        except Exception as e:
            print(e)
            return Response(status=ERR)

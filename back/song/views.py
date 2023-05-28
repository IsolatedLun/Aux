from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from responses import OK, NOT_FOUND, ERR
from . import models
from . import serializers


class SongListView(APIView):
    def get(self, req):
        songs = models.Song.objects.all()
        serialized_data = serializers.SongSerializer(songs, many=True).data

        return Response(data=serialized_data, status=OK)
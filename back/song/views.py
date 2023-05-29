from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from responses import OK, NOT_FOUND, ERR
from . import models
from . import serializers
from utils.paginator import pagination_wrapper


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
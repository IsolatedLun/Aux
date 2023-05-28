from rest_framework import serializers
from . import models
from user.utils import get_user_or_none

class SongSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return get_user_or_none(obj)

    class Meta:
        model = models.Song
        fields = '__all__'
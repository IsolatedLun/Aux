from rest_framework import serializers
from . import models
from user.utils import get_user_or_none

class SongSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    languages = serializers.SerializerMethodField(method_name='get_languages')

    def get_user(self, obj):
        return get_user_or_none(obj)
    
    def get_languages(self, obj):
        return [x.language for x in models.SongLyrics.objects.filter(song_id=obj.id)]

    class Meta:
        model = models.Song
        fields = '__all__'
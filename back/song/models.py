from django.db import models
from taggit.managers import TaggableManager
from django.core.validators import FileExtensionValidator

from user.models import cUser

class Song(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=72)
    
    thumbnail = models.ImageField(upload_to='thumbnails/%Y', default='thumbnails/default.png')
    audio = models.FileField(
        upload_to='audios/%Y',
        validators=[FileExtensionValidator(
            allowed_extensions=['wav', 'mp3', 'm4a', 'flac', 'ogg', 'wma']
        )]
    )

    tags = TaggableManager()

    views = models.PositiveBigIntegerField(default=0)
    likes = models.PositiveBigIntegerField(default=0)
    dislikes = models.PositiveBigIntegerField(default=0)
    
    date_created = models.DateTimeField(auto_now_add=True)

class SongLyrics(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    lyrics = models.TextField()
    
    language = models.CharField(max_length=256)

class ViewedSong(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)

    last_viewed = models.DateTimeField(auto_now=True)
    amount_viewed = models.PositiveBigIntegerField(default=0)

class RatedSong(models.Model):
    class RateType(models.TextChoices):
        NEUTRAL = 'NEUTRAL', 'Neutral'
        LIKE = 'LIKE', 'Like'
        DISLIKE = 'DISLIKE', 'DisLike'

    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)

    rate_type = models.CharField(max_length=7, choices=RateType.choices, default=RateType.NEUTRAL)
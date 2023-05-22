from django.db import models
from taggit.managers import TaggableManager
from django.core.validators import FileExtensionValidator

from user.models import cUser

class Song(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=72)
    
    thumbnail = models.ImageField(upload_to='thumbnails/%Y')
    audio = models.FileField(
        upload_to='audios/%Y',
        validators=[FileExtensionValidator(
            allowed_extensions=['wav', 'mp3', 'm4a', 'flac', 'ogg', 'wma']
        )]
    )

    tags = TaggableManager()

    views = models.PositiveBigIntegerField()
    likes = models.PositiveBigIntegerField()
    dislikes = models.PositiveBigIntegerField()
    
    date_created = models.DateTimeField(auto_now_add=True)

class ViewedSong(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)

    last_viewed = models.DateTimeField(auto_now_add=True)
    amount_viewed = models.PositiveBigIntegerField()

class RatedSong(models.Model):
    class RateType(models.TextChoices):
        NEUTRAL = 'NEUTRAL', 'Neutral'
        LIKE = 'LIKE', 'Like'
        DISLIKE = 'DISLIKE', 'DisLike'

    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)

    rate_type = models.CharField(max_length=7, choices=RateType.choices, default=RateType.NEUTRAL)
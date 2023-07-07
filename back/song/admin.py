from django.contrib import admin
from . import models

admin.site.register(models.Song)
admin.site.register(models.SongLyrics)

admin.site.register(models.ViewedSong)
admin.site.register(models.RatedSong)
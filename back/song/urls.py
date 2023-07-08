from django.urls import path

from . import views

urlpatterns = [
    path('<int:page>', views.PaginatedSongView.as_view(), name='GET | Paginated songs'),
    path('<int:page>/user/<int:id>', views.PaginatedUserSongsView.as_view(), name='GET | Paginated user songs'),
    path('<int:id>/edit', views.EditSongView.as_view(), name='POST | Edit song'),
    
    path('upload', views.UploadSongView.as_view(), name='POST | Upload song'),

    path('view/<int:id>', views.ViewedSongView.as_view(), name='POST | View song'),
    path('lyric/<int:id>/all', views.AllSongLyricsView.as_view(), name='GET | All lyrics for song'),

    path('lyric/<int:id>/<str:language>', views.SongLyricView.as_view(), name='GET | Lyrics for song'),

    path('langlist', views.LanguangeRecordView.as_view(), name='GET | language record'),
]
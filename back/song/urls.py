from django.urls import path

from . import views

urlpatterns = [
    path('langlist', views.LanguangeRecordView.as_view(), name='GET | Language record'),
    path('upload', views.UploadSongView.as_view(), name='POST | Upload song'),

    path('<int:id>/edit', views.EditSongView.as_view(), name='POST | Edit song'),
    path('<int:id>/delete', views.DeleteSongView.as_view(), name='DELETE | Delete song'),

    path('view/<int:id>', views.ViewedSongView.as_view(), name='POST | View song'),
    path('lyric/<int:id>/all', views.AllSongLyricsView.as_view(), name='GET | All lyrics for song'),
    path('lyric/<int:id>/<str:language>', views.SongLyricView.as_view(), name='GET | Lyrics for song'),

    
    path('<int:page>/<str:query>/search', views.SearchSongView().as_view(), name='GET | Search song'),
    path('<int:page>/<str:order_by>', views.PaginatedSongView.as_view(), name='GET | Paginated songs'),
    path('<int:page>/user/<int:id>/<str:order_by>', views.PaginatedUserSongsView.as_view(), name='GET | Paginated user songs')
]
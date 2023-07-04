from django.urls import path

from . import views

urlpatterns = [
    path('<int:page>', views.PaginatedSongView.as_view(), name='GET | Paginated songs'),
    path('upload', views.UploadSongView.as_view(), name='POST | Upload song'),
    path('view/<int:id>', views.ViewedSongView.as_view(), name='POST | View song'),

    path('langlist', views.LanguangeRecordView.as_view(), name='GET | language record'),
]
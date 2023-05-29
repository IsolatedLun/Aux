from django.urls import path

from . import views

urlpatterns = [
    path('<int:page>', views.PaginatedSongView.as_view(), name='GET | Songs'),
]
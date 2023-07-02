"""
URL configuration for back project.
"""
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('songs/', include('song.urls')),
    path('users/', include('user.urls'))

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

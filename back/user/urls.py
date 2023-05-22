from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

from . import views

urlpatterns = [
    path('token/refresh', TokenRefreshView.as_view(), name='Refresh token'),
    path('authenticate', views.JWTAuthenticateView.as_view(),
         name='auth-authenticate'),

    path('login', views.JWTLoginView.as_view(), name='Login'),
    path('signup', views.RegisterView.as_view(), name='Sign up'),

    path('users/<int:user_id>', views.UserView.as_view(), name='User view'),
]

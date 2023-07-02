from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

from . import views

urlpatterns = [
    path('token/refresh', TokenRefreshView.as_view(), name='POST | Login(Access + Refresh)'),
    path('authenticate', views.JWTAuthenticateView.as_view(),
         name='POST | Authenticate'),

    path('login', views.JWTLoginView.as_view(), name='POST | Login'),
    path('register', views.RegisterView.as_view(), name='POST | Register'),

    path('users/<int:user_id>', views.UserView.as_view(), name='POST | User'),
]

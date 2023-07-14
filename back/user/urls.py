from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

from . import views

urlpatterns = [
    path('<int:id>', views.UserView.as_view(), name='GET | User'),
    path('delete', views.DeleteUserView.as_view(), name='DELETE | user'),
    path('save', views.SaveUserView.as_view(), name='POST | Save user'),

    path('token/refresh', TokenRefreshView.as_view(), name='POST | Login(Access + Refresh)'),
    path('authenticate', views.JWTAuthenticateView.as_view(),
         name='POST | Authenticate'),

    path('login', views.JWTLoginView.as_view(), name='POST | Login'),
    path('register', views.RegisterView.as_view(), name='POST | Register'),
]

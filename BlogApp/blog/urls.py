from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/posts/', views.posts),
    path('api/category/', views.category),
    path('api/comment/', views.comment),
    path('api/register/', views.register),
    path('api/token/', views.CustomTokenObtainPairView, name='token_obtain_pair'),
    path('api/logout/', views.logout, name='logout'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
from django.urls import path
from . import views

urlpatterns = [
    path('/api/posts/', views.posts),
    path('/api/category/', views.category),
    path('/api/comment/', views.comment),
    path('/api/register/', views.register),
    path('/api/auth/', views.login)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
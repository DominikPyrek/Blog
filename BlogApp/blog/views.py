from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import Post
from rest_framework import status

@api_view(['GET', 'Post'])
def posts(request):

    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET', 'Post'])
def category(request):

    if request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    posts = Category.objects.all()
    serializer = CategorySerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET', 'Post'])
def comment(request):

    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    posts = Comment.objects.all()
    serializer = CommentSerializer(posts, many=True)
    return Response(serializer.data)
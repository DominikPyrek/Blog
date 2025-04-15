from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import Post
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
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

@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
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

@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
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

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data["username"]
    password = request.data["password"]

    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

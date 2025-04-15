from rest_framework import serializers
from .models import Post,Category,Comment
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class PostTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title']

class CommentSerializer(serializers.ModelSerializer):
    post = PostTitleSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'date']
        read_only_fields = ['author', 'date']

class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category', 
        write_only=True,
        required=False
    )  
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'author', 'category', 'category_id', 'date', 'pic', 'content', 'comments']
        read_only_fields = ['author', 'date']
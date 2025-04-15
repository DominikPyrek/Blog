from rest_framework import serializers
from .models import Post,Category,Comment

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
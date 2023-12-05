from django.contrib.auth.models import Group, User
from django.contrib.auth.hashers import make_password
from tweets.serializers import TweetSerializer
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    tweets = TweetSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'password', 'tweets']

    def validate_password(self, value: str) -> str:
        return make_password(value)


from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Tweet
from .serializers import TweetSerializer

class TweetListCreateView(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

from django.urls import path
from .views import HealthAPIView, RegisterUserView, ItemAPIView


urlpatterns = [
    path('', HealthAPIView.as_view()),
    path('api/v1/signup', RegisterUserView.as_view()),
    path('api/v1/item/', ItemAPIView.as_view())
]
from django.urls import path
from .views import HealthAPIView, RegisterUserView


urlpatterns = [
    path('', HealthAPIView.as_view()),
    path('register/', RegisterUserView.as_view())
]
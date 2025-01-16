from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import HealthAPIView, RegisterUserView, ItemAPIView

urlpatterns = [
    path('', HealthAPIView.as_view()),
    path('api/v1/signup', RegisterUserView.as_view()),
    path('api/v1/item/', ItemAPIView.as_view())
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
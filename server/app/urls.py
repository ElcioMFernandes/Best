from django.urls import path
from .views import (
    CustomUserListCreateAPIView,
    CustomUserRetrieveUpdateDestroyAPIView,
    WalletListCreateAPIView,
    WalletRetrieveUpdateDestroyAPIView,
    ProductListCreateAPIView,
    ProductRetrieveUpdateDestroyAPIView,
    OrderListCreateAPIView,
    OrderRetrieveUpdateDestroyAPIView,
    TransactionListCreateAPIView,
    TransactionRetrieveUpdateDestroyAPIView,
    CustomUserRetrieveUpdateAPIView
)

urlpatterns = [
    path('users/', CustomUserListCreateAPIView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', CustomUserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'),
    path('users/me/', CustomUserRetrieveUpdateAPIView.as_view(), name='user-me'),
    path('wallets/', WalletListCreateAPIView.as_view(), name='wallet-list-create'),
    path('wallets/<int:pk>/', WalletRetrieveUpdateDestroyAPIView.as_view(), name='wallet-detail'),
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
    path('orders/', OrderListCreateAPIView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderRetrieveUpdateDestroyAPIView.as_view(), name='order-detail'),
    path('transactions/', TransactionListCreateAPIView.as_view(), name='transaction-list-create'),
    path('transactions/<int:pk>/', TransactionRetrieveUpdateDestroyAPIView.as_view(), name='transaction-detail'),
]
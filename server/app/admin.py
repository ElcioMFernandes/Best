from django.contrib import admin
from .models import CustomUser, Wallet, Item, Trade, Order


# Customizing CustomUser Admin
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('register', 'is_active', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    search_fields = ('register', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    ordering = ('register',)


# Customizing Wallet Admin
@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'asset')
    search_fields = ('user_id__register', 'user_id__first_name', 'user_id__last_name')
    ordering = ('user_id',)


# Customizing Item Admin
@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'stock')
    search_fields = ('name', 'description')
    list_filter = ('price',)
    ordering = ('name',)


# Customizing Trade Admin
@admin.register(Trade)
class TradeAdmin(admin.ModelAdmin):
    list_display = ('wallet_id', 'order_id', 'type', 'value', 'reason')
    search_fields = ('wallet_id__user_id__register', 'reason', 'order_id__id')
    list_filter = ('type',)
    ordering = ('-id',)


# Customizing Order Admin
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'item_id', 'status')
    search_fields = ('user_id__register', 'item_id__name', 'id')
    list_filter = ('status',)
    ordering = ('-id',)

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Wallet, Product, Order, Transaction, RequestLog

class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password', 'password_changed')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    list_display = ('username', 'first_name', 'last_name', 'is_staff', 'password_changed')
    search_fields = ('username', 'first_name', 'last_name')
    ordering = ('username',)
    filter_horizontal = ()
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    readonly_fields = ('password_changed',)

admin.site.register(CustomUser, CustomUserAdmin)

class WalletAdmin(admin.ModelAdmin):
    list_display = ('user', 'balance', 'reserved_balance')
    search_fields = ('user__username',)
    list_filter = ('balance', 'reserved_balance')
    readonly_fields = ('user', 'balance', 'reserved_balance')

    def has_add_permission(self, request):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Wallet, WalletAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'reserved_stock')
    search_fields = ('name',)
    list_filter = ('price', 'stock')
    readonly_fields = ('reserved_stock', 'created_at', 'updated_at')

admin.site.register(Product, ProductAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'user', 'status', 'created_at', 'updated_at')
    search_fields = ('product__name', 'user__username', 'created_at')
    list_filter = ('status',)

    def get_readonly_fields(self, request, obj=None):
        if obj:  # This is the case when the object is already created
            if obj.status != 'PEN':
                return ['product', 'user', 'status', 'created_at', 'updated_at']
            else:
                return ['product', 'user', 'created_at', 'updated_at']
        else:
            return ['status']

    def save_model(self, request, obj, form, change):
        if not change:  # This is the case when the object is being created
            obj.status = 'PEN'
        super().save_model(request, obj, form, change)

admin.site.register(Order, OrderAdmin)

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'wallet', 'value', 'type', 'detail', 'created_at')
    search_fields = ('wallet__user__username', 'detail')
    list_filter = ('type', 'value')

    def get_readonly_fields(self, request, obj = ...):
        if obj:
            return ['wallet', 'order', 'value', 'type', 'detail', 'created_at']
        else:
            return []

admin.site.register(Transaction, TransactionAdmin)

class RequestLogAdmin(admin.ModelAdmin):
    list_display = ('method', 'endpoint', 'ip_address', 'timestamp')
    search_fields = ('method', 'endpoint', 'ip_address')
    list_filter = ('method', 'timestamp')
    readonly_fields = ('method', 'endpoint', 'ip_address', 'headers', 'body', 'timestamp')

admin.site.register(RequestLog, RequestLogAdmin)
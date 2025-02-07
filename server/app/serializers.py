from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, Wallet, Product, Order, Transaction

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'password', 'password_changed']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user

class WalletSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Wallet
        fields = ['id', 'user', 'balance', 'reserved_balance']

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'image', 'reserved_stock']

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None

class OrderSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(write_only=True)
    product = ProductSerializer(read_only=True)
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'product', 'product_id', 'price_at_order', 'user', 'status', 'created_at', 'updated_at']

    def create(self, validated_data):
        product_id = validated_data.pop('product_id')
        product = Product.objects.get(id=product_id)
        order = Order.objects.create(product=product, **validated_data)
        return order

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d/%m/%Y - %H:%M:%S')

    def get_updated_at(self, obj):
        return obj.updated_at.strftime('%d/%m/%Y - %H:%M:%S')

class TransactionSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    wallet = WalletSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'order', 'wallet', 'value', 'type', 'detail', 'created_at']

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d/%m/%Y - %H:%M:%S')
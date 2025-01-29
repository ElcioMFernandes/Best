from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, Wallet, Product, Order, Transaction

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'password']
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
        fields = ['id', 'name', 'price', 'stock', 'image', 'reserved_stock']

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
        fields = ['id', 'product', 'product_id', 'user', 'status']

    def create(self, validated_data):
        product_id = validated_data.pop('product_id')
        product = Product.objects.get(id=product_id)
        order = Order.objects.create(product=product, **validated_data)
        return order

class TransactionSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    wallet = WalletSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'order', 'wallet', 'value', 'type', 'detail']
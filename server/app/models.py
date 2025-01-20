from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, password, **extra_fields)

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=30, null=False, blank=False, verbose_name="Nome")
    last_name = models.CharField(max_length=70, null=False, blank=False, verbose_name="Sobrenome")

    email = None
    groups = None
    user_permissions = None

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return str(self.id)

class Wallet(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.PROTECT)
    balance = models.DecimalField(max_digits=10, decimal_places=0, default=0)
    reserved_balance = models.DecimalField(max_digits=10, decimal_places=0, default=0)

    def __str__(self):
        return str(self.user.username)
    
    def save(self, *args, **kwargs):
        if self.balance < 0:
            raise ValueError("Saldo não pode ser negativo.")
        
        if self.reserved_balance < 0:
            raise ValueError("Saldo empenhado não pode ser negativo.")
        
        super().save(*args, **kwargs)

class Product(models.Model):
    name = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    stock = models.IntegerField()
    reserved_stock = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if self.price < 0:
            raise ValueError("Preço do item não pode ser negativo.")

        if self.stock < 0:
            raise ValueError("Quantidade em estoque não pode ser negativo.")
        
        if self.reserved_stock < 0:
            raise ValueError("Quantidade empenhada não pode ser negativa.")
    
        super().save(*args, **kwargs)
class Order(models.Model):
    STATUS_CHOICES = [
        ('PEN', 'Pendente'),
        ('FIN', 'Finalizado'),
        ('CAN', 'Cancelado'),
    ]

    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    user = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default='PEN')

    def __str__(self):
        return f"#{self.id}({self.status}): {self.product.name} - {self.user.username}"

class Transaction(models.Model):
    TYPE_CHOICES = [
        ('ADD', 'Adição de fundos'),
        ('DEB', 'Débito')
    ]

    order = models.ForeignKey(Order, on_delete=models.PROTECT, null=True, blank=True)
    wallet = models.ForeignKey(Wallet, on_delete=models.PROTECT)
    value = models.DecimalField(max_digits=10, decimal_places=0, null=True, blank=True)
    type = models.CharField(max_length=3, choices=TYPE_CHOICES, default='ADD')
    detail = models.CharField(max_length=100)

    def __str__(self):
        return f"#{self.id}: {self.wallet} - {self.detail}"
    
    def save(self, *args, **kwargs):
        if self.value < 0:
            raise ValueError("Uma transação não pode ser de valor negativo.")

        super().save(*args, **kwargs)        

@receiver(pre_save, sender=Transaction)
def set_value(sender, instance, **kwargs):
    if instance.order and instance.value is None:
        instance.value = instance.order.product.price

@receiver(post_save, sender=Order)
def handle_order_status(sender, instance, created, **kwargs):
    wallet = Wallet.objects.get(user=instance.user)
    product = instance.product
    
    if created and instance.status == 'PEN':
        # Atualiza o saldo empenhado e o estoque reservado
        wallet.reserved_balance += product.price
        wallet.balance -= product.price
        product.reserved_stock += 1
        product.stock -= 1
        wallet.save()
        product.save()
    elif instance.status == 'CAN':
        # Cria uma transação de adição e atualiza os saldos
        Transaction.objects.create(
            order=instance,
            wallet=wallet,
            value=product.price,
            type='ADD',
            detail=f'Cancelamento de pedido: {product.name}'
        )
        wallet.reserved_balance -= product.price
        wallet.balance += product.price
        product.reserved_stock -= 1
        product.stock += 1
        wallet.save()
        product.save()
    elif instance.status == 'FIN':
        # Atualiza o saldo empenhado e o estoque reservado
        wallet.reserved_balance -= product.price
        product.reserved_stock -= 1
        wallet.save()
        product.save()

@receiver(post_save, sender=Transaction)
def update_wallet(sender, instance, created, **kwargs):
    if created:
        if instance.type == 'ADD':
            instance.wallet.balance += instance.value
        elif instance.type == 'DEB':
            instance.wallet.balance -= instance.value
        instance.wallet.save()
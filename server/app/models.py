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
    first_name = models.CharField(max_length=30, null=False, blank=False, verbose_name="Nome", help_text="Nome do usuário")
    last_name = models.CharField(max_length=70, null=False, blank=False, verbose_name="Sobrenome", help_text="Sobrenome do usuário")

    email = None
    groups = None
    user_permissions = None

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.username} - {self.first_name} {self.last_name}"
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

class Wallet(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.PROTECT, verbose_name="Usuário", help_text="Usuário dono da carteira")
    balance = models.DecimalField(max_digits=10, decimal_places=0, default=0, verbose_name="Saldo", help_text="Saldo disponível")
    reserved_balance = models.DecimalField(max_digits=10, decimal_places=0, default=0, verbose_name="Saldo empenhado", help_text="Saldo empenhado em pedidos")

    def __str__(self):
        return str(self.user.username)
    
    def save(self, *args, **kwargs):
        if self.balance < 0:
            raise ValueError("Saldo não pode ser negativo.")
        
        if self.reserved_balance < 0:
            raise ValueError("Saldo empenhado não pode ser negativo.")
        
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Carteira'
        verbose_name_plural = 'Carteiras'

class Product(models.Model):
    name = models.CharField(max_length=20, verbose_name="Nome", help_text="Nome do produto")
    description = models.CharField(max_length=150, verbose_name="Descrição", null=True, blank=True, help_text="Descição do produto")
    price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="Preço", help_text="Preço do produto")
    stock = models.IntegerField(verbose_name="Estoque", help_text="Quantidade em estoque")
    reserved_stock = models.IntegerField(default=0, verbose_name="Estoque reservado", help_text="Quantidade empenhada em pedidos")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em", help_text="Data de criação do produto")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em", help_text="Data de atualização do produto")
    image = models.ImageField(upload_to='products/', null=True, blank=True, verbose_name="Imagem do Produto")
    
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

    class Meta:
        verbose_name = 'Produto'
        verbose_name_plural = 'Produtos'

class Order(models.Model):
    STATUS_CHOICES = [
        ('PEN', 'Pendente'),
        ('FIN', 'Finalizado'),
        ('CAN', 'Cancelado'),
    ]

    product = models.ForeignKey(Product, on_delete=models.PROTECT, verbose_name="Produto", help_text="Produto do pedido")
    user = models.ForeignKey(CustomUser, on_delete=models.PROTECT, verbose_name="Usuário", help_text="Usuário que fez o pedido")
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default='PEN', verbose_name="Status", help_text="Status do pedido")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em", help_text="Data de criação do pedido")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em", help_text="Data de atualização do pedido")
    
    def __str__(self):
        return f"Order {self.id} - {self.product.name} - {self.user.username}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'

class Transaction(models.Model):
    TYPE_CHOICES = [
        ('ADD', 'Adição de fundos'),
        ('DEB', 'Débito de fundos')
    ]

    order = models.ForeignKey(Order, on_delete=models.PROTECT, null=True, blank=True, verbose_name="Pedido", help_text="Pedido relacionado à transação")
    wallet = models.ForeignKey(Wallet, on_delete=models.PROTECT, verbose_name="Carteira", help_text="Carteira relacionada à transação")
    value = models.DecimalField(max_digits=10, decimal_places=0, null=True, blank=True, verbose_name="Valor", help_text="Valor da transação")
    type = models.CharField(max_length=3, choices=TYPE_CHOICES, default='ADD', verbose_name="Tipo", help_text="Tipo da transação")
    detail = models.CharField(max_length=100, verbose_name="Detalhes", help_text="Detalhes da transação")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em", help_text="Data de criação da transação")

    def __str__(self):
        return f"#{self.id}: {self.wallet} - {self.detail}"
    
    def save(self, *args, **kwargs):
        if self.value < 0:
            raise ValueError("Uma transação não pode ser de valor negativo.")

        super().save(*args, **kwargs)        

    class Meta:
        verbose_name = 'Transação'
        verbose_name_plural = 'Transações'

class RequestLog(models.Model):
    method = models.CharField(max_length=10)
    endpoint = models.CharField(max_length=255)
    ip_address = models.GenericIPAddressField()
    headers = models.TextField()
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.method} {self.endpoint} at {self.timestamp}"

# Define o valor da transação com base no preço do produto
@receiver(pre_save, sender=Transaction)
def set_value(sender, instance, **kwargs):
    if instance.order and instance.value is None:
        instance.value = instance.order.product.price

# Atualiza o saldo empenhado e o estoque reservado após uma mudança de status
@receiver(post_save, sender=Order)
def handle_order_status(sender, instance, created, **kwargs):
    wallet = Wallet.objects.get(user=instance.user)
    product = instance.product
    
    if created and instance.status == 'PEN':
        # Verifica se há saldo suficiente antes de criar o pedido
        if wallet.balance < product.price:
            raise ValueError("Saldo insuficiente para criar o pedido.")
        # Cria uma transação de débito para o pedido
        Transaction.objects.create(
            order=instance,
            wallet=wallet,
            value=product.price,
            type='DEB',
            detail=f'Pedido de {product.name}'
        )
        # Atualiza o saldo empenhado e o estoque reservado
        wallet.reserved_balance += product.price
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
        product.reserved_stock -= 1
        product.stock += 1
        wallet.save()
        product.save()

    elif not created and instance.status == 'FIN':
        # Atualiza o saldo empenhado e o estoque reservado
        wallet.reserved_balance -= product.price
        product.reserved_stock -= 1
        wallet.save()
        product.save()

# Atualiza o saldo da carteira após uma transação
@receiver(post_save, sender=Transaction)
def update_wallet(sender, instance, created, **kwargs):
    if created:
        if instance.type == 'ADD':
            instance.wallet.balance += instance.value
        elif instance.type == 'DEB':
            if instance.wallet.balance < instance.value:
                raise ValueError("Saldo insuficiente para realizar a transação.")
            instance.wallet.balance -= instance.value
        instance.wallet.save()

# Cria uma carteira para cada novo usuário
@receiver(post_save, sender=CustomUser)
def create_wallet_for_new_user(sender, instance, created, **kwargs):
    if created:
        Wallet.objects.create(user=instance)
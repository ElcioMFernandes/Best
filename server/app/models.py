from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models


# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, register, password=None, **extra_fields):
        if not register:
            raise ValueError("The register field must be set")
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        user = self.model(register=register, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, register, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(register, password, **extra_fields)


# Custom User Model
class CustomUser(AbstractUser):
    username = None  # Remove the default `username` field
    register = models.CharField(
        max_length=9,
        unique=True,
        primary_key=True,
        verbose_name="Register (Matrícula)",
        help_text="Matrícula do usuário. Deve ser única.",
    )

    first_name = models.CharField(max_length=150, blank=False, null=False)
    last_name = models.CharField(max_length=150, blank=False, null=False)

    USERNAME_FIELD = 'register'  # Field used for login
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Fields required to create superuser

    objects = CustomUserManager()  # Custom manager

    def __str__(self):
        return f"{self.register} - {self.first_name} {self.last_name}"


# Wallet Model
class Wallet(models.Model):
    user_id = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    asset = models.DecimalField(max_digits=9, decimal_places=0, default=0)

    def __str__(self):
        return str(self.user_id)


@receiver(post_save, sender=CustomUser)
def create_wallet_for_user(sender, instance, created, **kwargs):
    if created:  # Create a wallet only when a new user is created
        Wallet.objects.create(user_id=instance)


# Item Model
class Item(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.CharField(max_length=100, null=False, blank=False)
    price = models.DecimalField(max_digits=9, decimal_places=0, default=0)
    stock = models.IntegerField(null=False, blank=False, default=0)
    image = models.ImageField(
        upload_to='uploads/',
        null=True,
        blank=True,
        verbose_name="Item Image",
        help_text="Upload an image representing the item."
    )

    def __str__(self):
        return str(f"{self.name} - {self.description}")


# Trade Model
class Trade(models.Model):
    ADD = "ADD"
    DED = "DED"
    CHOICES = [
        (ADD, "Addition"),
        (DED, "Deduct"),
    ]
    wallet_id = models.ForeignKey(Wallet, on_delete=models.CASCADE, null=False, blank=False)
    order_id = models.ForeignKey(
        'Order',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Associated Order"
    )
    value = models.DecimalField(max_digits=9, decimal_places=0, default=0, null=False, blank=False)
    reason = models.CharField(max_length=250, null=False, blank=True)
    type = models.CharField(max_length=3, choices=CHOICES, null=False, blank=False)

    def __str__(self):
        return str(f"{self.wallet_id}({self.id}). {self.type} - {self.value}")

    def save(self, *args, **kwargs):
        wallet = self.wallet_id

        if self.type == self.ADD:
            wallet.asset += self.value
            wallet.save()
            super().save(*args, **kwargs)
        elif self.type == self.DED:
            if wallet.asset >= self.value:
                wallet.asset -= self.value
                wallet.save()
                super().save(*args, **kwargs)
            else:
                raise ValueError("Insufficient funds in the wallet to perform this transaction.")
        else:
            raise ValueError("Invalid transaction type.")


# Order Model
class Order(models.Model):
    COM = "COM"
    CAN = "CAN"
    CON = "CON"
    CHOICES = [
        (COM, "Committed"),
        (CAN, "Canceled"),
        (CON, "Concluded"),
    ]
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    status = models.CharField(max_length=3, choices=CHOICES, default=COM)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)

    def __str__(self):
        return f"Order #{self.id} - {self.item_id}"


@receiver(post_save, sender=Order)
def create_trade_for_order(sender, instance, created, **kwargs):
    if created and instance.status == Order.COM:  # Only create Trade for new Orders with status "COM"
        user_wallet = Wallet.objects.get(user_id=instance.user_id)
        item = instance.item_id

        if user_wallet.asset < item.price:
            # Insufficient wallet funds
            instance.status = Order.CAN  # Automatically cancel the order
            instance.save(update_fields=["status"])
            return

        if item.stock <= 0:
            # Insufficient item stock
            instance.status = Order.CAN  # Automatically cancel the order
            instance.save(update_fields=["status"])
            return

        # Create the debit transaction
        trade = Trade(
            wallet_id=user_wallet,
            value=item.price,
            reason=f"Purchase of {item.name}",
            type=Trade.DED,
            order_id=instance
        )
        trade.save()

        # Deduct 1 from the item stock
        item.stock -= 1
        item.save()

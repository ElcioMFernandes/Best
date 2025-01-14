from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

# Create your models here.
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

class CustomUser(AbstractUser):
    username = None  # Removendo o campo padrão `username`
    register = models.CharField(
        max_length=9,
        unique=True,
        primary_key=True,
        verbose_name="Register (Matrícula)",
        help_text="Matrícula do usuário. Deve ser única.",
    )

    first_name = models.CharField(max_length=150, blank=False, null=False)
    last_name = models.CharField(max_length=150, blank=False, null=False)

    USERNAME_FIELD = 'register'  # Campo usado para login
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Campos obrigatórios ao criar superusuário

    objects = CustomUserManager()  # Usando o gerenciador personalizado

    def __str__(self):
        return self.register
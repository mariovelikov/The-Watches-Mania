from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    def create_user(self, name, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        
        # create hashed version of the password, no just plain text passwordpytho
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, name, email, password=None):
            if not email:
                raise ValueError('Users must have an email address')
            
            if not password:
                raise ValueError('Users must have a password')

            email = self.normalize_email(email)
            user = self.model(email=email, name=name)
            
            # create hashed version of the password, no just plain text password
            user.set_password(password)
            user.is_staff = True
            user.is_superuser = True


            user.save()
            return user


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name

    def __str__(self):
        return self.name
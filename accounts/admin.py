from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
User = get_user_model()

class UserAdmin(BaseUserAdmin):
    list_display  = ('name', 'email', 'is_staff', 'is_active')
    list_filter = ('is_superuser',)

    search_fields =  ('name', 'email')
    ordering = ('name','email')

    fieldsets = (
        (None, {'fields': ('email', 'name',  'password')}),
        # ('Personal info', {'fields': ('')}),
        ('Permissions', {'fields': ('is_superuser', 'is_active', 'is_staff')}),
    )
    add_fieldsets = (
        (None, {
            'fields': ('email', 'date_joined', 'username', 'last_name', 'first_name' ),
        }),
    )
    
    filter_horizontal = ()

admin.site.register(User, UserAdmin)

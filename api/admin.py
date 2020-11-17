from django.contrib import admin

# Register your models here.

from .models import Tag, Image

admin.site.register(Tag)
admin.site.register(Image)
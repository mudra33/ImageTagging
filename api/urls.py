from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
	path('image-list/', views.imageList, name="image-list"),
	path('tag-delete/<str:pk>/', views.tagDelete, name="tag-delete"),
	
	path('image-tag-add/<str:pk>/', views.imageTagAdd, name='image-tag-add')
]

from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets

from .serializers import  ImageCustomSerializer
from .models import  Tag, Image


@api_view(['GET'])
def imageList(request):
	images = Image.objects.all().order_by('image_id')
	serializer = ImageCustomSerializer(images, context={"request": request}, many=True)
	return Response(serializer.data)


@api_view(['DELETE'])
def tagDelete(request, pk):
	tag = Tag.objects.get(id=pk)
	tag.delete()
	return Response('Tag succsesfully delete!')


@api_view(['POST'])
def imageTagAdd(request, pk):
	image_obj = Image.objects.get(pk=pk)
	data = request.data
	new_tag = Tag.objects.create(tag_name=data['tag_name'])
	image_obj.tags.add(new_tag)
	image_obj.save()
	
	return Response('Tag added succsesfully')

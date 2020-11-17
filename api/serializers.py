from rest_framework import serializers
from .models import Tag, Image

class ImageCustomSerializer(serializers.ModelSerializer):

	tag_list = serializers.SerializerMethodField()

	img = serializers.SerializerMethodField('get_image_url')

	def get_tag_list(self, instance):
		tag_list = []
		tag_objs = instance.tags.get_queryset()
		for tag_obj in tag_objs:
			tag_detail = {}
			tag_detail['id'] = tag_obj.id
			tag_detail['tag_name'] = tag_obj.tag_name
			tag_list.append(tag_detail)
		return tag_list

	class Meta:
		model = Image
		fields = ('image_id', 'description', 'img', 'x', 'y', 'height', 'width', 'tags', 'tag_list')

	def get_image_url(self, obj):
		request = self.context.get("request")
		return request.build_absolute_uri(obj.img.url)		

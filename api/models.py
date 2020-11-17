from django.db import models

# Create your models here.


class Tag(models.Model):
	tag_name = models.CharField(max_length=200)

	def __str__(self):
		return str(self.tag_name)


class Image(models.Model):
    image_id = models.AutoField(primary_key=True)
    description = models.TextField()

    img = models.ImageField(upload_to="images/")

    x = models.IntegerField()
    y = models.IntegerField()
    height = models.IntegerField()
    width = models.IntegerField()

    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return str(self.image_id)

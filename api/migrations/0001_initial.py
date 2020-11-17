# Generated by Django 3.0.3 on 2020-10-08 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('completed', models.BooleanField(blank=True, default=False, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('image_id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.TextField()),
                ('img', models.ImageField(upload_to='images/')),
                ('x', models.IntegerField()),
                ('y', models.IntegerField()),
                ('height', models.IntegerField()),
                ('width', models.IntegerField()),
                ('tags', models.ManyToManyField(to='api.Tag')),
            ],
        ),
    ]
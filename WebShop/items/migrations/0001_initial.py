# Generated by Django 2.1.7 on 2019-03-05 18:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
	initial = True

	dependencies = [
	]

	operations = [
		migrations.CreateModel(
			name='Category',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('name', models.CharField(max_length=128)),
				('description', models.TextField()),
				('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL,
											 to='items.Category')),
			],
		),
		migrations.CreateModel(
			name='Item',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('name', models.CharField(max_length=256)),
				('description', models.TextField()),
				('created', models.DateTimeField(auto_now_add=True)),
				('updated', models.DateTimeField(auto_now=True)),
				('price', models.FloatField()),
				('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL,
											   to='items.Category')),
			],
		),
	]

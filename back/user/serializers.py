from rest_framework import serializers
from django.apps import apps

from . import models


class cUserSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(format="%b %d, %Y")

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance

    class Meta:
        model = models.cUser
        exclude = ['password', 'email',
                   'email_address', 'first_name', 'last_name', 
                   'last_login', 'groups', 'user_permissions', 'is_active'
                    ]

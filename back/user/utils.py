from .serializers import cUserSerializer


def get_user_or_none(obj: dict, _serializer=None):
    """
        Tries to retreive the user which is the foreign key of an object\n
        If no user is found, None is returned
    """
    try:
        return _serializer(obj.user).data if _serializer else cUserSerializer(obj.user).data
    except:
        return None
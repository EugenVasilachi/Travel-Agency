from functools import wraps
from django.http import JsonResponse
from rest_framework.authtoken.models import Token


def token_required(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        token = self.request.headers.get('Authorization')
        if not token:
            return JsonResponse({'error': 'Token is missing'}, status=401)
        try:
            token = token.split(' ')[1]
            Token.objects.get(key=token)
        except Token.DoesNotExist:
            return JsonResponse({'error': 'Invalid token'}, status=401)
        return func(self, *args, **kwargs)

    return wrapper

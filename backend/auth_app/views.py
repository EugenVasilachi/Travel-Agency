import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from rest_framework.authtoken.models import Token


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse({"detail": "Provide username and password!"}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({"detail": "Invalid credentials!"}, status=400)

    login(request=request, user=user)
    token, _ = Token.objects.get_or_create(user=user)

    return JsonResponse({"detail": "Successfully logged in!", "token": token.key})


@require_POST
def login_admin_view(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse({"detail": "Provide username and password!"}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({"detail": "Invalid credentials!"}, status=400)

    login(request=request, user=user)
    token = Token.objects.get(user=user)
    return JsonResponse({"detail": "Successfully logged in!", "token": token.key})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "You are not logged in!"}, status=400)

    logout(request=request)
    return JsonResponse({"detail": "Successfully logged out!"})


@require_POST
def register_view(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not all([username, password, email]):
        return JsonResponse({"detail": "Provide username, password, email, and phone!"}, status=400)

    if len(password) < 6:
        return JsonResponse({"detail": "Password must have a minimum of 6 characters!"}, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({"detail": "Username already exists!"}, status=400)

    user = User.objects.create_user(username=username, password=password, email=email)
    token = Token.objects.create(user=user)

    login(request=request, user=user)

    return JsonResponse({"detail": "User successfully registered!", "token": token.key})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"is_authenticated": False})

    return JsonResponse({"is_authenticated": True})


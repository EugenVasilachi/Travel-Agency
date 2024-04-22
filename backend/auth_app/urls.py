from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view, name="api-login"),
    path("loginAdmin/", views.login_view, name="api-login-admin"),
    path("logout/", views.logout_view, name="api-logout"),
    path("register/", views.register_view, name="api-register"),
    path("session/", views.session_view, name="api-session"),
]
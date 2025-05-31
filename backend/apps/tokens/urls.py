from django.urls import path
from .views import CookieTokenObtainPairView, CookieTokenRefreshView, logout, isAuthenticated

urlpatterns = [
    path("", CookieTokenObtainPairView.as_view(), name="get_token"),
    path("refresh/", CookieTokenRefreshView.as_view(), name="refresh_token"),
    path("logout/", logout, name="logout"),
    path("authenticated/", isAuthenticated, name="is_authenticated"),
]

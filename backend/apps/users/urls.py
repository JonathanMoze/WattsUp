from django.urls import path
from .views import CreateUserView, DashboardView

urlpatterns = [
    path('register/', CreateUserView.as_view(), name="register"),
    path('dashboard/', DashboardView.as_view(), name="dashboard"),
]

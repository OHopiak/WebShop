from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from items.router import router as items_router
from users.router import router as users_router
from utils import DefaultRouter

router = DefaultRouter()
router.extend(items_router)
router.extend(users_router)

urlpatterns = router.urls + [
	path('auth/', include('rest_framework.urls', namespace='rest_framework')),
	path('auth/token/', obtain_jwt_token),
	path('auth/token/refresh/', refresh_jwt_token),
	path('auth/token/verify/', verify_jwt_token),
	path('docs/', include_docs_urls(title='WebShop API')),
]

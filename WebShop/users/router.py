from utils import SimpleRouter

from .views import UserViewSet, UserProfileViewSet

router = SimpleRouter()

router.register('users', UserViewSet)
# router.register('password', ChangePasswordView)
router.register('user-profiles', UserProfileViewSet)

from utils import SimpleRouter

from .views import ItemViewSet, CategoryViewSet

router = SimpleRouter()

router.register('items', ItemViewSet)
router.register('categories', CategoryViewSet)

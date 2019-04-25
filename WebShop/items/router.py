from utils import SimpleRouter

from .views import ItemViewSet, CategoryViewSet, OrderViewSet

router = SimpleRouter()

router.register('items', ItemViewSet)
router.register('orders', OrderViewSet)
router.register('categories', CategoryViewSet)

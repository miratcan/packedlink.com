from dataclasses import dataclass

from ninja import NinjaAPI

from blog.api import router as blog_router


@dataclass(frozen=True)
class ApiConfig:
    prefix: str = "api/v1"


api_config = ApiConfig()

api = NinjaAPI(title="PackedLink API", version="1.0")

api.add_router("/blog", blog_router)

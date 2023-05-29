from django.core.paginator import Paginator
from django.db.models import Model
from rest_framework import serializers
from typing import TypeVar, Generic, List, Callable

I = TypeVar('I', Model, Callable)
O = TypeVar('O', serializers.ModelSerializer, Callable)

def pagination_wrapper(
    table: I,
    filters: dict,
    serializer: O,
    serializer_kwargs: dict,
    next_page: int,
    per_page: int,
    sort_by: str | None = None
) -> tuple[List[O], int | None]:
    """
        A pagination wrapper for all models.\n
        Returns a serialized queryset with the next page index
    """
    queryset = table.objects.all().filter(**filters)

    if sort_by:
        queryset = queryset.order_by(sort_by)

    paginated_queryset = Paginator(queryset, per_page).get_page(next_page)
    serialized_queryset = serializer(
        paginated_queryset, 
        many=True, 
        **serializer_kwargs
    ).data

    next_page = paginated_queryset.next_page_number(
    ) if paginated_queryset.has_next() else None

    return (serialized_queryset, next_page)
from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse, HttpResponse
from .models import ConversionFactor


def convert(request):
    sentFrom = request.GET['from']
    to = request.GET['to']
    value = float(request.GET['value'])

    factor = get_object_or_404(ConversionFactor, pk=1)

    try:
        value = (value * float(getattr(factor, sentFrom))) / float(getattr(factor, to))

        response = {
            "units": to,
            "value": value
        }

        return JsonResponse(response)

    except AttributeError as error:
        response = {'error': 'Invalid unit conversion request'}
        print(error)

        return JsonResponse(response)

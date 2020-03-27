from django.http import JsonResponse
from .models import ConversionFactor


def convert(request):
    # get parameters from given URL
    sentFrom = request.GET['from']
    to = request.GET['to']
    value = float(request.GET['value'])

    # get most recently created ConversionFactor object
    factor = ConversionFactor.objects.last()

    # attempt to convert the given value and return a JSON object storing the new units and new value
    try:
        value = (value * float(getattr(factor, sentFrom))) / float(getattr(factor, to))

        response = {
            "units": to,
            "value": value
        }

        return JsonResponse(response)

    # return JSON error message and print error to console.
    except AttributeError as error:
        response = {'error': 'Invalid unit conversion request'}
        print(error)

        return JsonResponse(response)

from django.shortcuts import render
from django.http import JsonResponse


def convert(request):
    sentFrom = request.GET['from']
    to = request.GET['to']
    value = request.GET['value']

    response = [
        {'from': sentFrom},
        {'to': to},
        {'value': value}
    ]

    return JsonResponse(response, safe=False)

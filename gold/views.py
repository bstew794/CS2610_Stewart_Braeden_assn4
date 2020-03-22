from django.shortcuts import render


def index(request):
    context = {}
    return render(request, 'gold/index.html', context)

from django.db import models


class ConversionFactor(models.Model):
    g = 1.0
    T = 907185.0 * g
    t_oz = 31.1 * g
    kg = 1000.0 * g
    lb = 453.6 * g
    oz = 28.35 * g

from django.db import migrations


def populate_db(apps, schema_editor):
    ConversionFactor = apps.get_model('unitconv', 'ConversionFactor')

    factors = ConversionFactor()
    factors.save()


class Migration(migrations.Migration):
    dependencies = [
        ('unitconv', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(populate_db)
    ]

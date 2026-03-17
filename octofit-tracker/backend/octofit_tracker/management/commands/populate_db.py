from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Eliminar datos previos
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Crear equipos
        marvel = Team.objects.create(name='marvel', members=['Iron Man', 'Captain America', 'Thor'])
        dc = Team.objects.create(name='dc', members=['Superman', 'Batman', 'Wonder Woman'])

        # Crear usuarios
        User.objects.create(email='ironman@marvel.com', name='Iron Man', team='marvel')
        User.objects.create(email='cap@marvel.com', name='Captain America', team='marvel')
        User.objects.create(email='thor@marvel.com', name='Thor', team='marvel')
        User.objects.create(email='superman@dc.com', name='Superman', team='dc')
        User.objects.create(email='batman@dc.com', name='Batman', team='dc')
        User.objects.create(email='wonderwoman@dc.com', name='Wonder Woman', team='dc')

        # Crear actividades
        Activity.objects.create(user='Iron Man', type='run', duration=30, date='2026-03-17')
        Activity.objects.create(user='Batman', type='cycle', duration=45, date='2026-03-17')

        # Crear leaderboard
        Leaderboard.objects.create(team='marvel', points=150)
        Leaderboard.objects.create(team='dc', points=120)

        # Crear workouts
        Workout.objects.create(name='Pushups', description='Do pushups', suggested_for='marvel')
        Workout.objects.create(name='Squats', description='Do squats', suggested_for='dc')

        # Crear índice único en email usando PyMongo
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        db.users.create_index([('email', 1)], unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db poblada con datos de prueba'))

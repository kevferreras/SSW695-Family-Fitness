IP Address: http://3.83.66.222
Port: 8000
superuser: admin2
password: password

Login: /api/login
Example cmd: curl -X POST -d "username=<admin2>&password=<password>" http://127.0.0.1:8000/api/login/                                                            

LogWorkout
curl -X POST -d "name=cmdlinetest1133&workout_type=Running" http://127.0.0.1:8000/api/logworkout


    name = models.CharField('WorkOuts',max_length=30)
    workout_type = models.CharField(max_length=30)
    workout_category = models.CharField(max_length=30, blank = True, null = True)
    workout_intensity = models.IntegerField(blank = True, null = True)
    workout_duration = models.DurationField(blank = True, null = True)
    start_time = models.DateTimeField(blank = True, null = True) # YYYY-MM-DD HH:MM
    end_time = models.DateTimeField(blank = True, null = True) # YYYY-MM-DD HH:MM
    total_distance = models.IntegerField(blank = True, null = True)
    gps_coordinates = models.CharField(max_length=30,blank = True, null = True)
    workout_account = models.ForeignKey(Account, blank = True, null=True, on_delete = models.SET_NULL)
    workout_tags = models.ManyToManyField(Tags, blank = True)

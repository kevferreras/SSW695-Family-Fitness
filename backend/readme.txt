IP Address: http://3.83.66.222
Port: 8000
superuser: admin2
password: password

Login: /api/login
Example cmd: curl -X POST -d "username=<admin2>&password=<password>" http://127.0.0.1:8000/api/login/                                                            

LogWorkout
curl -X POST -d "name=cmdlinetest1133&workout_type=Running" http://127.0.0.1:8000/api/logworkout

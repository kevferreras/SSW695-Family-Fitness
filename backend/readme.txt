IP Address: http://3.83.66.222
Port: 8000
superuser: admin2
password: password

Login: /api/login
Example cmd: curl -X POST -d "username=<admin2>&password=<password>" http://127.0.0.1:8000/api/login/                                                            

LogWorkout
curl -X POST -d "name=cmdlinetest1133&workout_type=Running" http://127.0.0.1:8000/api/logworkout
curl -X POST -d "name=test&workout_type=test" http://ec2-54-161-61-21.compute-1.amazonaws.com:8000/api/logworkout -H 'Authorization: Token 9fc96ad55b2f03ca687ab8fbf643ffbcc4b93d5b'
ec2-54-161-61-21.compute-1.amazonaws.com

creategetgroup route
curl -X POST -d "name=newGroup&group_description=newgroup created by test1" http://127.0.0.1:8000/api/creategetgroup -H 'Authorization: Token c8dabb9479d655c00ad273fbad410f2e4b4e3270'


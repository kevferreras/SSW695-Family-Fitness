import requests

endpoint = "http://localhost:8000/home/show_all"
#endpoint = "https://httpbin.org/anything"
#url = endpoint + "/api/"

get_response = requests.get(endpoint)
#print(get_response.text)

print(get_response.json())
print(get_response.status_code)
import requests

BASE_URI = "http://localhost:5000"


data = [
    {"id": 1, "name": "task1", "description": "this is task 1", "completed": True},
    {"id": 2, "name": "task2", "description": "this is task 2", "completed": False},
    {"id": 3, "name": "task3", "description": "this is task 3", "completed": True},
    {"id": 4, "name": "task4", "description": "this is task 4", "completed": False},
]


for i in range(0, len(data)):
    print(data[i])
    response = requests.post(BASE_URI + "/todo", json=data[i])
    print(response.json())

input()
todos = requests.get(BASE_URI + "/todo")
print(todos.json())

input()
updated = requests.put(
    BASE_URI + "/todo/5",
    json={"name": "task1", "description": "this is task 1", "completed": True},
)
print(updated.json())

input()
todo = requests.get(BASE_URI + "/todo/5")
print(todo.json())

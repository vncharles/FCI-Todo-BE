class UserDTO:
    def __init__(self, id: int, name: str, username: str):
        self.id = id
        self.name = name
        self.username = username

    def serialize(self):
        return {"id": self.id, "name": self.name, "username": self.username}

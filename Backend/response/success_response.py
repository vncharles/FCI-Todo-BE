class SuccessResponse:
    def __init__(self, status_code, message, data):
        self.status_code = status_code
        self.message = message
        self.data = data

    def serialize(self):
        return {"message": self.message, "data": self.data}, self.status_code

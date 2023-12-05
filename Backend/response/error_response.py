class ErrorResponse:
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message

    def serialize(self):
        return {"message": self.message}, self.status_code

from db import db

class TodoModel(db.Model):
    __tablename__ = "todos"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean)
from db import db
from models.user import User


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

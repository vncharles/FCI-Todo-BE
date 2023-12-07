from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models.task import Task
from schemas import TaskSchema, UpdateTaskSchema

blp = Blueprint("Task", __name__, description="Operations on items")


@blp.route("/todo/<string:task_id>")
class Item(MethodView):
    @blp.response(200, TaskSchema)
    def get(self, task_id):
        item = Task.query.get_or_404(task_id)
        return item

    # @blp.response(200)
    def delete(self, task_id):
        item = Task.query.get_or_404(task_id)
        db.session.delete(item)
        db.session.commit()
        return {"message": "Todo deleted."}

    @blp.arguments(UpdateTaskSchema)
    @blp.response(200, TaskSchema)
    def put(self, data, task_id):
        item = Task.query.get_or_404(task_id)

        if "name" in data:
            item.name = data["name"]
        if "description" in data:
            item.description = data["description"]
        if "completed" in data:
            item.completed = data["completed"]

        db.session.add(item)
        db.session.commit()

        return item


@blp.route("/todo")
class ItemList(MethodView):
    @blp.response(200, TaskSchema(many=True))
    def get(self):
        return Task.query.all()

    @blp.arguments(TaskSchema)
    @blp.response(201, TaskSchema)
    def post(self, data: TaskSchema):
        item = Task(**data)

        try:
            db.session.add(item)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the item.")

        return item

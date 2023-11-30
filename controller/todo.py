from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
import uuid

from db import db
from models.todo import TodoModel
from schemas import TodoSchema, TodoUpdateSchema

blp = Blueprint("Todos", __name__, description="Operations on items")


@blp.route("/todo/<string:todo_id>")
class Item(MethodView):
    @blp.response(200, TodoSchema)
    def get(self, todo_id):
        item = TodoModel.query.get_or_404(todo_id)
        return item

    def delete(self, todo_id):
        item = TodoModel.query.get_or_404(todo_id)
        db.session.delete(item)
        db.session.commit()
        return {"message": "Todo deleted."}

    @blp.arguments(TodoUpdateSchema)
    @blp.response(200, TodoSchema)
    def put(self, data, todo_id):
        item = TodoModel.query.get_or_404(todo_id)

        if 'name' in data:
            item.name = data['name']
        if 'description' in data:
            item.description = data['description']
        if 'completed' in data:
            item.completed = data['completed']

        db.session.add(item)
        db.session.commit()

        return item


@blp.route("/todo")
class ItemList(MethodView):
    @blp.response(200, TodoSchema(many=True))
    def get(self):
        return TodoModel.query.all()

    @blp.arguments(TodoSchema)
    @blp.response(201, TodoSchema)
    def post(self, data: TodoSchema):
        item = TodoModel(**data)

        try:
            db.session.add(item)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the item.")

        return item
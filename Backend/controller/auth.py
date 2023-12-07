from flask_smorest import Blueprint, abort
from schemas import RegisterSchema, LoginSchema, UserResponse

from db import db
from models.user import User
from dto.user import UserDTO


blp = Blueprint("Auth", __name__, description="Operations on items", url_prefix="/auth")


@blp.route("/register", methods=["POST"])
@blp.arguments(RegisterSchema)
@blp.response(201, UserResponse)
def register(register_request):
    user = User.query.filter_by(username=register_request["username"]).first()
    if user:
        return abort(400, message="user is exits")

    user_new = User(**register_request)
    try:
        db.session.add(user_new)
        db.session.commit()
    except Exception as err:
        return abort(400, message="error server can't save")

    response = {"message": "register is success", "data": None}

    return response


@blp.route("/login", methods=["POST"])
@blp.arguments(LoginSchema)
@blp.response(200, UserResponse)
def login(login_request):
    user = User.query.filter_by(username=login_request["username"]).first()

    if not user:
        return abort(404, message="user is not exists")

    if user.password != login_request["password"]:
        return abort(400, message="password is not correct")

    user_dto = UserDTO(user.id, user.name, user.username)

    return {"message": "login is success", "data": user_dto.__dict__}

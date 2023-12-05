from flask_smorest import Blueprint
from schemas import RegisterSchema, LoginSchema

from db import db
from models.user import User
from dto.user import UserDTO
from response.error_response import ErrorResponse
from response.success_response import SuccessResponse


blp = Blueprint("Auth", __name__, description="Operations on items", url_prefix="/auth")


@blp.route("/register", methods=["POST"])
@blp.arguments(RegisterSchema)
def register(register_request):
    user = User.query.filter_by(username=register_request["username"]).first()
    if user:
        return ErrorResponse(400, "user is exists!!").serialize()

    user_new = User(**register_request)
    try:
        db.session.add(user_new)
        db.session.commit()
    except Exception as err:
        return ErrorResponse(400, "error server can't save").serialize()

    return SuccessResponse(201, "register is success", None).serialize()


@blp.route("/login", methods=["POST"])
@blp.arguments(LoginSchema)
def login(login_request):
    user = User.query.filter_by(username=login_request["username"]).first()

    if not user:
        return ErrorResponse(404, "user is not exists").serialize()

    if user.password != login_request["password"]:
        return ErrorResponse(400, "password is not correct").serialize()

    user_dto = UserDTO(user.id, user.name, user.username)

    return SuccessResponse(200, "login is success", user_dto.serialize()).serialize()

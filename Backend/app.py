from flask import Flask, jsonify
from flask_smorest import Api
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
import json

from db import db
from controller.task import blp as TodoBlueprint
from controller.auth import blp as AuthBlueprint


def create_app(db_url=None):
    app = Flask(__name__)
    app.config["API_TITLE"] = "Stores REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = "mysql://root:sapassword@localhost:3306/todo-app"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True
    db.init_app(app)
    api = Api(app)

    CORS(app, support_credentials=True)

    with app.app_context():
        db.create_all()

    api.register_blueprint(TodoBlueprint)
    api.register_blueprint(AuthBlueprint)

    # Configure Swagger UI
    SWAGGER_URL = "/swagger1"
    API_URL = "/swagger1.json"
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL, API_URL, config={"app_name": "Sample API"}
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    @app.route("/swagger1.json")
    def swagger():
        with open("swagger1.json", "r") as f:
            return jsonify(json.load(f))

    return app

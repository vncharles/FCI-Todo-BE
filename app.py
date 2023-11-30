from flask import Flask
from flask_smorest import Api
from flask_cors import CORS, cross_origin

from db import db

import models

from controller.todo import blp as TodoBlueprint


def create_app(db_url=None):
    app = Flask(__name__)
    app.config["API_TITLE"] = "Stores REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:password@localhost:3306/todo-app'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True
    db.init_app(app)
    api = Api(app)

    CORS(app, support_credentials=True)

    with app.app_context():
        db.create_all()

    api.register_blueprint(TodoBlueprint)

    return app
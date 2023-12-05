from marshmallow import Schema, fields


class TaskSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    completed = fields.Boolean(required=True)


class UpdateTaskSchema(Schema):
    name = fields.Str()
    description = fields.Str()
    completed = fields.Boolean()


class RegisterSchema(Schema):
    name = fields.Str(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class LoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)

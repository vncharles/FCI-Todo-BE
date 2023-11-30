from marshmallow import Schema, fields


class TodoSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    description = fields.Str()
    completed = fields.Boolean()


class TodoUpdateSchema(Schema):
    name = fields.Str()
    description = fields.Str()
    completed = fields.Boolean()


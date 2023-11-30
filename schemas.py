from marshmallow import Schema, fields


class TodoSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    completed = fields.Boolean(required=True)


class TodoUpdateSchema(Schema):
    name = fields.Str()
    description = fields.Str()
    completed = fields.Boolean()


from marshmallow import Schema, fields, pre_load


class OrderSchema(Schema):
    OrderID = fields.Int()
    OrderStatus = fields.Str()
    CustomerID = fields.Int()
    ProductID = fields.Int()

    @pre_load
    def make_object(self, data, **kwargs):
        return data


class ProductSchema(Schema):
    ProductID = fields.Int()
    ProductName = fields.Str()
    ProductPhotoURL = fields.Str()
    ProductStatus = fields.Str()

    @pre_load
    def make_object(self, data, **kwargs):
        return data

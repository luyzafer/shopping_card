const { Schema } = require("mongoose");

const CartCollection = "carts";

const CartSchema = new Schema(
  {
    timestamp: { type: String, required: true, max: 100 },
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
  },
  {
    virtuals: true,
  }
);

CartSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

module.exports =  CartModel = { CartCollection, CartSchema };
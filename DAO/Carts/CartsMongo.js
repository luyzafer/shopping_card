const { CartCollection, CartSchema } = require('../../model/CartModel.js')
const OperationsMongoDBContainer  = require('../../business/OperationsMongoDBContainer.js')


class CartsMongo extends OperationsMongoDBContainer {
  constructor() {
    super({
      name: CartCollection,
      schema: CartSchema,
    });
  }

  async getAll(id) {
    console.log("Entering to getAll(id)")
    const response = await this.model.findById(id).populate("products");
    console.log(response)

    return response;
  }

}

module.exports = CartsMongo

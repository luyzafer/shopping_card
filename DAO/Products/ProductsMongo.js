const { ProductsCollection, ProductSchema } = require('../../model/ProductModel.js')
const OperationsMongoDBContainer  = require('../../business/OperationsMongoDBContainer.js')


class ProductsMongo extends OperationsMongoDBContainer {
  constructor() {
    super({
      name: ProductsCollection,
      schema: ProductSchema,
    });
  }

  
}

module.exports = ProductsMongo

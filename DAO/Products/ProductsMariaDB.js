const { ProductsCollection, ProductSchema } = require('../../model/ProductModel.js')
const ProductOperationsMariaDBContainer = require('../../business/ProductOperationsMariaDBContainer.js');


class ProductsMariaDB extends ProductOperationsMariaDBContainer {

  
}

module.exports = ProductsMariaDB
//, { ProductsCollection, ProductSchema }

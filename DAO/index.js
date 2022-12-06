const { SELECTED_DATABASE } = require('../config/index.js');
const ProductsMongo  = require('./Products/ProductsMongo.js')
const CartsMongo  = require('./Carts/CartsMongo.js')
const MongoDBService = require('../services/MongoDBService/index.JS');
const ProductsFileSystem = require('./Products/ProductsFileSystem.js');
const ProductsFirebase = require('./Products/ProductsFirebase.js');


const getSelectedDaos = () => {
  switch (SELECTED_DATABASE) {
    case "mongo": {
      console.log("is Mongo")
      MongoDBService.init();
      return {
        ProductDao: new ProductsMongo(),
        CartDao: new CartsMongo(),
      };
    }
    case "fileSystem": {
      return {
        ProductDao: new ProductsFileSystem(),
        //CartDao: new CartsMemory(),
      };
    }
    case "firebase": {
      return {
        ProductDao: new ProductsFirebase(),
        //CartDao: new CartsMemory(),
      };
    }
  }
};

const { ProductDao , CartDao } = getSelectedDaos();

//export { ProductDao/*, CartDao*/ };

module.exports = {ProductDao, CartDao};
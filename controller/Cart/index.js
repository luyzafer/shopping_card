const { CartDao } = require('../../DAO/index.js')
const { ProductDao } = require('../../DAO/index.js')
const { JOI_VALIDATOR } = require('../../utility/joi-validator.js')



const getAllProductsCart = async (req, res) => {
  
  try {
    console.log("Entering to the Controller getAllProductsCar")
    const { id } = req.params;
    let cart = await CartDao.getAll(id);
   
    if (!cart) {
      return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
    }

    res.send(cart);
  } catch (error) {
    console.log(error)
    res.send({ error: "Internal server error" });
  }
};



const createCart = async (req, res) => {
  try {

    console.log("Entering to the Controller createCart")
    const d = new Date();
    let text = d.toString();
    const newCart = await JOI_VALIDATOR.cart.validateAsync({
      timestamp: text
    });
    const createdProduct = await CartDao.save(newCart);
    res.send(createdProduct);
  } catch (error) {
    console.log(error)
    res.send(error);
  }
};

const deleteById = async (req, res) => {
  console.log("Entering to the Controller deleteById")
  try {
    const { id } = req.params;
    await CartDao.deleteById(id);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ error: "Ocurrio un error" });
  }
};

const deleteProductsByCart = async (req, res) => {
  console.log("Entering to the Controller deleteById")
  try {
    const { id, idProd } = req.params;
    const cartToDeleteProd = await CartDao.getById(id)
    cartToDeleteProd.products.pull(idProd)
    CartDao.save(cartToDeleteProd)
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ error: "Ocurrio un error" });
  }
};



const addProductToCart = async (req, res) => {
  try {

    console.log("Entering to the Controller addProductToCart")

    const { id } = req.params;
    const {idProduct} = req.body
    const product = await ProductDao.getById(idProduct)
    let cartToUpdate = await CartDao.getById(id)
    cartToUpdate.products.push(product)
    const updatedProduct = await CartDao.save(cartToUpdate);
    res.send(updatedProduct);
  } catch (error) {
    console.log(error)
    res.send(error);
  }
}



module.exports = {getAllProductsCart, createCart, deleteById, addProductToCart, deleteProductsByCart}
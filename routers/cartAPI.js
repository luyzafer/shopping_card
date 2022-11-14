const { Router } = require("express");
const router = Router();
const cartOperations = require("../business/CartOperations_MariaDB.js");
const cartLogic = new cartOperations();
const productOperations = require("../business/ProductOperations_MariaDB");
const productsLogic = new productOperations();
const Utility = require('../utility/Utility.js');
const utilityTool = new Utility();
const Cart = require("../model/Cart.js");
const Product = require("../model/Product.js");
const ShoppingCart = require("../model/ShoppingCart.js");



router.post("/cart", async (req, res) => {
    console.log("Entering to create a new cart in MariaDB")
    await cartLogic.getAll().then(items => utilityTool.getLastId(items)).then(async id => {
        let newCart = new Cart(id + 1, Date.now())
        console.log("newCart" + newCart)
        return await cartLogic.save(newCart)
    }).then(cartCreated => res.send(cartCreated))
    
});

router.post("/cart/:id/products", async (req, res) => {
    console.log("Adding a product to a cart")
    const idCart= req.params.id
    const idProduct= req.body.idProduct

    let newShoppingCartItem = new ShoppingCart(idCart, idProduct)

    return await cartLogic.addProductToCart(newShoppingCartItem)
         .then(item=> res.send(item))
   
});

router.get("/cart/:id/products",async(req, res) => {
    console.log("entering to get all products for the cart " + req.params.id)
    const id= req.params.id
    await cartLogic.getProductsByCarId(id).then(cart =>{
        return cart
    }).then(item=> res.send(item))
    
});

router.delete('/delete/:id', (req, res) => {
    console.log("Entering delete cart" + req.params.id)
    const id = req.params.id
    cartLogic.deleteById(id).then(item => res.send("Removed the cart " + id))
});

router.delete('/cart/:id/products/:idProd', async (req, res) => {
    console.log("Entering delete product from a cart")
    const idCart = req.params.id
    const idProduct = req.params.idProd
    cartLogic.deleteProductInCar(idCart, idProduct)

    let cartUpdated = await cartLogic.getProductsByCarId(idCart)

    res.send(cartUpdated)
});


module.exports = router;
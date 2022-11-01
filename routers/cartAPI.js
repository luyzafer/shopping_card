const { Router } = require("express");
const router = Router();
const cartOperations = require("../business/CartOperations.js");
const cartLogic = new cartOperations();
const productOperations = require("../business/ProductOperations.js");
const productsLogic = new productOperations();
const Utility = require('../utility/Utility.js');
const utilityTool = new Utility();
const Cart = require("../model/Cart.js");
const Product = require("../model/Product.js");



router.post("/cart", async (req, res) => {
    console.log("Entering to create a new cart")
    await cartLogic.getAll().then(items => utilityTool.getLastId(items)).then(async id => {
        let newCart = new Cart(id + 1, Date.now(), new Array(new Product))
        console.log("newCart" + newCart)
        return await cartLogic.save(newCart)
    }).then(cartCreated => res.send(cartCreated))
    
});

router.post("/cart/:id/products", async (req, res) => {
    console.log("entre post carts products")
    const id= req.params.id
    const idProduct= req.body.idProduct
    await cartLogic.getById(id).then(async cart =>{
        let newProduct = await productsLogic.getById(idProduct)
        cart.products.push(newProduct)
        
        return cart
    }).then(cartUpdated => cartLogic.update(cartUpdated, id))
    .then(item=> res.send(item))
});

router.get("/cart/:id/products",async(req, res) => {
    console.log("entering to get all products for the cart " + req.params.id)
    const id= req.params.id
    await cartLogic.getById(id).then(cart =>{
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
    let cartFound = await cartLogic.getById(idCart)
    let products =  cartFound.products.filter(prod => prod.id != idProduct)
    cartFound.products = products
    cartLogic.update(cartFound, idCart)
    res.send(cartFound)
});


module.exports = router;
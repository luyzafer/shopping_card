const { Router } = require("express");
const router = Router();
const productOperations = require("../business/ProductOperations.js");
const productsLogic = new productOperations();
const Utility = require('../utility/Utility.js');
const Product = require("../model/Product.js");
const utilityTool = new Utility();
const verifyRole  =  require("../middlewares/verifyRole.js");



router.get('/list/:id?', async (req, res) => {
    console.log("Entering to get the list of products")
    let books = []
    if(req.params.id==null)
        books = await productsLogic.getAll()
    else
        books = await productsLogic.getById(req.params.id)
    res.send(books)
});


router.post("/product", verifyRole, async (req, res) => {
    console.log("Entering to save a new product")
    await productsLogic.getAll().then(items => utilityTool.getLastId(items)).then(async id => {
        let newProduct = new Product(id + 1, Date.now(), req.body.name, req.body.description, req.body.code, req.body.picture, req.body.price, req.body.stock)
        await productsLogic.save(newProduct)
    })
    let products = await productsLogic.getAll()
    res.send(products)
});



router.put("/product/:id", verifyRole,  async (req, res) => {
    console.log("Entering to update the product")
    const { name, description, code, picture, price, stock } = req.body
    const id = parseInt(req.params.id)
    const product = new Product(id, Date.now(), name, description, code, picture, price, stock)
    await productsLogic.update(product, id)
    const productUpdated = await productsLogic.getById(id)
    res.send(productUpdated)
});



router.delete('/product/:id', verifyRole,  (req, res) => {
    console.log("Entering to delete the product")
    const id = req.params.id
    productsLogic.deleteById(id).then(item => res.send("Removed the product " + id))
});


module.exports = router;
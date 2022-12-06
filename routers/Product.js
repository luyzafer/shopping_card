const { Router } = require("express");
const router = Router();
const Utility = require('../utility/Utility.js');
const Product = require("../model/Product.js");
const utilityTool = new Utility();
const verifyRole  =  require("../middlewares/verifyRole.js");
const ProductController = require('../controller/Product/index.js')


router.get("/list/:id?", verifyRole, ProductController.getAll);

router.post("/product", verifyRole, ProductController.createProduct)

router.delete('/product/:id', verifyRole, ProductController.deleteById)

router.put("/product/:id", verifyRole, ProductController.update)


module.exports = router;
const { Router } = require("express");
const router = Router();
const verifyRole  =  require("../middlewares/verifyRole.js");
const CartController = require('../controller/Cart/index.js')


router.get("/cart/:id/products", verifyRole, CartController.getAllProductsCart);

router.post("/cart", verifyRole, CartController.createCart)

router.delete("/delete/:id", verifyRole, CartController.deleteById)

router.post("/cart/:id/products", verifyRole, CartController.addProductToCart)

router.delete("/cart/:id/products/:idProd", verifyRole, CartController.deleteProductsByCart)


module.exports = router;
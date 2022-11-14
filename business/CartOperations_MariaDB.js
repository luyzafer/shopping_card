const fs = require('fs');
const cart = require('../model/Cart.js')
const {options} = require ('../db_options/mariaDB')
const knex = require ('knex')(options);

class CartOperations_MariaDB {


    async getAll() {
        console.log("Entering to get all carts")
        
        return await knex.from('Ecommerce.carts').select("*")
        .catch((err) => { console.log(err); throw err});

    }

    async save(cart) {
        return knex('carts').insert(cart).then(()=> {
            console.log("Saved in DB")
            return cart})
            .catch((err) => { console.log(err); throw err});
    }

    async deleteById(id) {
        return knex('carts').where("id", id).del()
        .catch((err) => { console.log(err); throw err});
    }

    async deleteProductInCar(idCart, idProduct) {
        return knex('shopping_cart').where("idCart", idCart).andWhere('idProduct', idProduct).del()
        .catch((err) => { console.log(err); throw err});
    }

    async getProductsByCarId(id){
        console.log("Entering to find the cart in DB")
        
        return knex('shopping_cart').select('*').where('idCart', id)
        .catch((err) => { console.log(err); throw err});

    }


    async addProductToCart (newShoppingCartItem){
        console.log("Entering to update the  cart" + cart.id)
        return knex('shopping_cart').insert(newShoppingCartItem).then(()=> console.log("Saved in DB"))
        .catch((err) => { console.log(err); throw err});
    }


   
}

module.exports = CartOperations_MariaDB
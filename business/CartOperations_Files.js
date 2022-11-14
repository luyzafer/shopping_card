const fs = require('fs');
const cart = require('../model/Cart.js')

class CartOperations_Files {

    constructor() {
    }

    async getAll() {
        console.log("Entering to get all carts")
        try {
            const cartsReturned = await fs.promises.readFile('./db/carts.txt', 'utf-8')
            let cartsDB = JSON.parse(cartsReturned.toString() || '[]')
            return cartsDB
        } catch (error) {
            throw new Error("Error reading the file: " + error.message)
        }
    }

    async save(cart) {
        console.log("Entering to save the new cart")
        try {
            return this.getAll().then(cartsDB => {
                cartsDB.push(cart)
                this.writeInDB(cartsDB)
                console.log("Saved the cart in the DB")
                return cart
            })

        } catch (error) {
            throw new Error(`Error saving the product ${cart.id} : ${error.message}`)
        }
    }

    async deleteById(id) {
        console.log("Entering to delete the cart with id: " + id)
        try {
            let newlistToReturn = this.getAll().then(carts => {
                return carts.filter(cart => cart.id != id)
            }).then(async newList => {
                this.writeInDB(newList)
                console.log(`New list of carts after removing id ${id} ${JSON.stringify(newList)}`)
                return newList
            })
            console.log(newlistToReturn)
            return newlistToReturn
        } catch (error) {
            throw new Error(`Error deleting cart with id: ${id} ${error.message}`)
        }
    }

    async getById(id){
        console.log("Entering to find the cart in DB")
        try{  
            return this.getAll().then(carts=> {
                let cartFound = null 
                cartFound = carts.find(p => p.id == id)   
                return cartFound == undefined ? null : cartFound
            })
        }catch(error){
            throw new Error(`Error getting cart with id: ${id} ${error.message}`)
        }
    }


    async update (cart, id){
        console.log("Entering to update the  cart" + cart.id)
        console.log(cart)
        try{
            const allCarts = await this.getAll()
            let cartToEdit = null
            cartToEdit = await this.getById(id)
            if(!cartToEdit)
                throw new Error('no existe el id '+cart.id)
            const elementosModificados= allCarts.map(item =>{
                if( item.id == id ){
                    return cart}
                return item
             })
            this.writeInDB(elementosModificados)
           
        }catch(error){
            throw new Error("Error updating the cart: " + cart.id + error.message)
        }
    }


    async writeInDB(cartsDB) {
        console.log("Entering to write in DB")
        try {
            await fs.promises.writeFile('./db/carts.txt', JSON.stringify(cartsDB, null, 2))
        } catch (error) {
            throw new Error(`Error writing in the file ${error.message}`)
        }
    }
}

module.exports = CartOperations_Files
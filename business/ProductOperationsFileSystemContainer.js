const fs = require('fs');
const Product = require('../model/Product.js');
const utility = require('../utility/Utility.js')

class ProductOperationsFileSystemContainer{

    idProduct = 0;

    constructor(idProduct){
        this.idProduct=idProduct
    }

    async getAll(){
        console.log("Entering to get all the products")
        try {
            const productsReturned = await fs.promises.readFile('./db/products.txt', 'utf-8')
            let productsDB = JSON.parse(productsReturned.toString()||'[]')
            return productsDB
        } catch (error) {
            throw new Error("Error reading the file: " + error.message)
        }
    }


    async save (product){
        console.log("Entering to save the new product")
        const productsDB = await this.getAll()
        const id = this.getLastId(productsDB)
        let newProduct = new Product(id+1, Date.now(), product.name, product.description, product.code, product.picture , product.price, product.stock)
        console.log(newProduct)
        try{
            return this.getAll().then(productsDB=> {
                productsDB.push(newProduct)
                this.writeInDB(productsDB)
                console.log("Saved in DB")
            })

        }catch(error){
            throw new Error(`Error saving the product ${product.id} : ${error.message}`)
        }
    }

    getLastId(productsDB){
        let lastId = 0
        productsDB.forEach(element => {
            if(element.id>lastId){
                lastId=element.id
            }
        });
        return lastId
    }

    //Corregir el id al editar
    async update (product, id){
        console.log("Entering to update the  product" + id)
        try{
            const allProducts = await this.getAll()
            let productToEdit = null
            productToEdit = await this.getById(id)
            product.id = parseInt(id)
            console.log(productToEdit)
            if(!productToEdit)
                throw new Error('no existe el id '+id)
            const elementosModificados= allProducts.map(item =>{
                if( item.id == id ){
                    return product}
                return item
             })
            this.writeInDB(elementosModificados)
           
        }catch(error){
            throw new Error("Error updating the product: " + product.id + error.message)
        }
    }

    async getById(id){
        console.log("Entering to find the product in DB")
        try{  
            return this.getAll().then(products=> {
                let productFound = null 
                productFound = products.find(p => p.id == id)   
                return productFound == undefined ? null : productFound
            })
        }catch(error){
            throw new Error(`Error getting product with id: ${id} ${error.message}`)
        }
    }

    async writeInDB(listProducts){
        console.log("Entering to write in DB")
        try {
            await fs.promises.writeFile('./db/products.txt', JSON.stringify(listProducts, null, 2))
        } catch (error) {
            throw new Error(`Error writing in the file ${error.message}`)
        }
    }

    async deleteById(id){
        console.log("Entering to delete the product with id: " + id)
        try {
            let newlisttoReturn = this.getAll().then(products => {
            return products.filter(prod => prod.id !=id )
            }).then(async newList=> {
                this.writeInDB(newList)
                console.log(`New list of products after removing id ${id} ${JSON.stringify(newList)}`)
                return newList
            })
            console.log(newlisttoReturn)
            return newlisttoReturn
        } catch (error) {
            throw new Error(`Error deleting product with id: ${id} ${error.message}`)
        }
    }
        
    async deleteAll(){
        try {
            let listEmpty = [] 
            this.writeInDB(listEmpty)
            console.log(`New list of products after removing all ${JSON.stringify(listEmpty)}`)
            
        } catch (error) {
            throw new Error(`Error deleting all products`)
        }
    }
}

module.exports = ProductOperationsFileSystemContainer


const fs = require('fs');
const {options} = require ('../db_options/mariaDB')
const knex = require ('knex')(options);

class ProductOperationsMariaDBContainer{


    async getAll(){
        console.log("Entering to get all the products in MariaDB")

        return await knex.from('Ecommerce.products').select("*")
        .catch((err) => { console.log(err); throw err});

    } 


    async save (product){
        console.log("Entering to save the new product in MariaDB")
    
            return knex('products').insert(product).then(()=> console.log("Saved in DB"))
            .catch((err) => { console.log(err); throw err});

    }


    async update (product, id){
        console.log("Entering to update the  product" + product.id)
        knex.from('products').where("id", id).update(product)
        .catch((err) => { console.log(err); throw err});
    }


    async getById(id){
        console.log("Entering to find the product in Maria DB")
        return knex.from('products').select("*").where("id", id)
        .catch((err) => { console.log(err); throw err});
       
    }

    async deleteById(id){
         knex.from('products').where("id", id).del()
        .catch((err) => { console.log(err); throw err});
    }
        
    async deleteAll(){
        knex.from('products').del()
        .catch((err) => { console.log(err); throw err});
    }
}

module.exports = ProductOperationsMariaDBContainer


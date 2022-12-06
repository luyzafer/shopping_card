const mongoose = require("mongoose");

class OperationsMongoDBContainer {

    constructor({ name, schema }) {
        console.log("Entering to constructor")
        this.model = mongoose.model(name, schema);
      }

    async getAll() {
        console.log("Entering to get all the products in MongoDB")
        const response = await this.model.find()
        return response
    }


    async save(product) {
        console.log("Entering to save the new product in MongoDB")
        const response = await this.model.create(product)
        return response
    }


    async update(product, id) {
        console.log("Entering to update the  product" + product.id)
        const response = await this.model.findByIdAndUpdate(id, product, {
            new:true,
        });
        return response
    }


    async getById(id) {
        console.log("Entering to find the product in MongoDB")
        const response = await this.model.findById(id)
        return response
    }

    async deleteById(id) {
        console.log("Entering to delete by id t in MongoDB")
        const response = await this.model.findByIdAndDelete(id)
        return response
    }


}

module.exports = OperationsMongoDBContainer


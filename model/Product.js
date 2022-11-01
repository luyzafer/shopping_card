class Product {
    id = 0
    timestamp
    name
    description
    code
    picture
    price
    stock

    constructor(id, timestamp, name, description, code, picture, price, stock) { 
        this.id = id
        this.timestamp = timestamp
        this.name = name
        this.description = description
        this.code = code
        this.picture = picture
        this.price = price
        this.stock = stock
    }   
}

module.exports = Product

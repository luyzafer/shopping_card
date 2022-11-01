class Cart {
    id = 0
    timestamp
    products = new Array();
    
    constructor(id, timestamp, products) { 
         this.id = id
         this.timestamp = timestamp
         this.products = products
    }   
}

module.exports = Cart

const {options} = require ('./mariaDB.js')
const knex = require ('knex')(options);

knex.schema.createTable('products' , table => {
    table.increments('id')
    table.string('timestamp')
    table.string('name')
    table.string('description')
    table.string('code')
    table.string('picture')
    table.integer('price')
    table.integer('stock')
})
.then(()=> console.log("table created"))
.catch((err) => { console.log(err); throw err});


knex.schema.createTable('carts' , table => {
    table.integer('id')
    table.string('timestamp')
})
.then(()=> console.log("table created"))
.catch((err) => { console.log(err); throw err})
.finally(() => {
    knex.destroy();
});


knex.schema.createTable('shopping_cart' , table => {
    table.integer('idCart')
    table.integer('idProduct')
})
.then(()=> console.log("table created"))
.catch((err) => { console.log(err); throw err})
.finally(() => {
    knex.destroy();
});


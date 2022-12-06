const express = require("express");
const { create } = require('express-handlebars');
const {Server: HttpServer} = require('http');
const {Server : IOServer} = require('socket.io');
const { PORT } = require('./config/index.js');


const indexRoutes = require('./routers/index');
const productsRouter  = require('./routers/Product');
const cartRouter  = require('./routers/Cart');

const Utility = require('./utility/Utility.js');
const Product = require("./model/Product.js");
const utilityTool = new Utility();



const { all } = require("./routers/index");





app = express()

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);



const hbs = create({
    extname: ".hbs",
    helpers: {
    }
 });

//  aca le decimos que usamos handlebars como motor de plantilla
app.engine('.hbs', hbs.engine);

// establecemos el motor de plantillas que vamos a usar 
app.set('view engine', '.hbs');

// establecemos el directorio donde estan nuestra plantillas 
app.set('views', './views');

// establecemos la carpeta donde estan nuestro achivos publicos
app.use(express.static('public'))

// Permite recibir parámetros en formato JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoutes);
//app.use("/error", errorRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);


app.use('*',(req, res)=>{
    res.send( { error :  -2, description: "The route " + req.baseUrl + " with the method " + req.method + " is not authorized" })
})


httpServer.listen(PORT, () => {
    console.log(`Server listeting on port ${PORT}`)
});


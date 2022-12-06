
const connect = require('../services/FirebaseDBService/index.js')

class ProductsFirebaseContainer{

//Adicionar try & catch
    async  getAll() {
        console.log("Entering getAll Firebase")
        connect().then(async db =>{

            const citiesRef = db.collection('Products');
            const snapshot = await citiesRef.get();
            snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            });
            return snapshot


            // const collections = db.collection('Products')
            // const doc=  await collections.get()

              
            // let product = document.docs.map(doc =>{ return {...doc.data(), id:doc.id}} )
            // console.log(product)
           
            // return  JSON.parse(product.toString()||'[]')
    })}
    

    async save(data){

        console.log("Entering save Firebase")

        connect().then(async db =>{
            const collections = db.collection('Products')
            const document=collections.doc()
            // nos brinda un documento temporal con un id autogenerado
            await document.create(data)
            // ese documento le agrega datos y lo guarda
            console.log("creado !")
        })   
    }

    async getById(id){
        connect().then(async db =>{
            const collections = db.collection('Products')
            const document=await collections.doc(id).get()
            const product = await document.data()
            // document me va a responder const con funcionalida
            // y la funcion data es un getter a los datos que 
            // tiene almacenado
            return product
        })
    }
}

module.exports = ProductsFirebaseContainer

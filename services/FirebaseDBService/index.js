
const admin = require("firebase-admin");

const serviceAccount = require("../../db_options/shopping-cart-a5baf-firebase-adminsdk-dmoxs-daca4204e3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const connect = async()=>{
	try{
		const db=   admin.firestore();
		console.log('FIREBASE CONECTADO')
		return db
	}
	catch(e){
		console.log('ERROR AL CONECTAR A FIREBASE ',e)
	}

}
module.exports = connect;

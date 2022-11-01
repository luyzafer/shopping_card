class Utility{


    getLastId(productsDB){
        let lastId = 0
        productsDB.forEach(element => {
            if(element.id>lastId){
                lastId=element.id
            }
        });
        return lastId
    }
}

module.exports = Utility
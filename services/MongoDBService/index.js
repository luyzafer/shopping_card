

const mongoose = require('mongoose');
const { DATABASES } = require('../../config/index.js');


const init = async () => {
  try {
    mongoose.connect(DATABASES.mongo.url, {
    dbName: DATABASES.mongo.dbName,
    });
    console.log("🗝️+ Connection with mongodb established 🙃");
  } catch (error) {
    console.log(error);
  }
};

module.exports =  MongoDBService = {
  init,
};
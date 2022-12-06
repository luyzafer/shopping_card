const { ProductDao } = require('../../DAO/index.js')
const { JOI_VALIDATOR } = require('../../utility/joi-validator.js')


// /api/products
const getAll = async (req, res) => {
  
  try {
    console.log("Entering to the Controller Product GetAll")
    let product = ''
    if(req.params.id==null)
      product = await ProductDao.getAll();   
    else
      product = await ProductDao.getById(req.params.id)
    if (!product) {
      return res.send("No products");
    }

    res.send(product);
  } catch (error) {
    console.log(error)
    res.send({ error: "Internal server error" });
  }
};



const createProduct = async (req, res) => {
  try {

    console.log("Entering to the Controller Product createProduct")
    const { name, description, code, picture, price, stock } = req.body;
    console.log(name, description, code, picture, price, stock )
    const d = new Date();
    let text = d.toString();

    // con el validador que creamos en el archivo joi validator, podemos invocar al método validateAsync y pasarle las propiedades que creemos seran nuestro producto, y si están bien, nos devolvera el objeto que guardamos en product
    // si no, saltará al catch
    const product = await JOI_VALIDATOR.product.validateAsync({
      name,
      description,
      code,
      picture,
      price,
      stock,
      timestamp: text
    });

    
    console.log(product)
    const createdProduct = await ProductDao.save(product);

    res.send(createdProduct);
  } catch (error) {
    console.log(error)
    res.send(error);
  }
};


const update = async (req, res) => {
  try {

    console.log("Entering to the Controller Product updateProduct")
    const { name, description, code, picture, price, stock } = req.body;
    const id = req.params.id
   
    const d = new Date();
    let text = d.toString();

    // con el validador que creamos en el archivo joi validator, podemos invocar al método validateAsync y pasarle las propiedades que creemos seran nuestro producto, y si están bien, nos devolvera el objeto que guardamos en product
    // si no, saltará al catch
    const product = await JOI_VALIDATOR.product.validateAsync({
      name,
      description,
      code,
      picture,
      price,
      stock,
      timestamp: text
    });

    const updatedProduct = await ProductDao.update(product, id);

    res.send(updatedProduct);
  } catch (error) {
    console.log(error)
    res.send(error);
  }
};


const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductDao.deleteById(id);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ error: "Ocurrio un error" });
  }
};


module.exports = {getAll, createProduct, deleteById, update}
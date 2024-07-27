const { Product } = require('../models');

// Add product function
const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file ? req.file.path : null; // Get the file path from multer
    if (!req.file) {
      return res.status(400).send({ error: 'No image file uploaded' });
    }

    // console.log(image);
    // Create the product
    const product = await Product.create({ name, price, image });
    
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { addProduct,getAllProducts, getProductById };

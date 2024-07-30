const { Costumer,Product } = require('../models');

const addCostumer = async (req, res) => {
  try {
    const { name, email, phone, id_product, id_upline } = req.body;

    // Create the customer
    const costumer = await Costumer.create({ name, email, phone, id_product, id_upline });
    
    res.status(201).send(costumer);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Add image to existing costumer function
const addImageToCostumer = async (req, res) => {
  try {
    const { id } = req.params;
    const imagePath = req.file ? req.file.path : null; // Get the file path from multer

    // Find the customer
    const costumer = await Costumer.findByPk(id);
    if (!costumer) {
      return res.status(404).send({ error: 'Customer not found' });
    }

    // Update the customer with the image path
    costumer.image = imagePath;
    await costumer.save();

    res.status(200).send(costumer);
  } catch (error) {
    res.status(400).send(error);
  }
};


const deleteCostumer = async (req, res) => {
  try {
    const costumer = await Costumer.findByPk(req.params.id);
    if (!costumer) {
      return res.status(404).send({ error: 'Costumer not found' });
    }
    await costumer.destroy();
    res.send({ message: 'Costumer deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCostumerById = async (req, res) => {
  try {
    const costumer = await Costumer.findByPk(req.params.id);
    if (!costumer) {
      return res.status(404).send({ error: 'Costumer not found' });
    }
    res.send(costumer);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCostumersByUpline = async (req, res) => {
  try {
    const costumers = await Costumer.findAll({ where: { id_upline: req.params.id_upline } });
    res.send(costumers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCostumers = async (req, res) => {
  try {
    const customers = await Costumer.findAll({
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['name', 'price'],
        },
      ],
    });
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getCostumerByName = async (req, res) => {
  try {
    const costumer = await Costumer.findOne({ where: { name: req.params.name } });
    if (!costumer) {
      return res.status(404).send({ error: 'Costumer not found' });
    }
    res.send(costumer);
  } catch (error) {
    res.status(500).send(error);
  }
};

// New function to update a customer
const updateCostumer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, image, id_product, id_upline } = req.body;

    const costumer = await Costumer.findByPk(id);
    if (!costumer) {
      return res.status(404).send({ error: 'Costumer not found' });
    }

    // Update the customer with the new data
    costumer.name = name || costumer.name;
    costumer.email = email || costumer.email;
    costumer.phone = phone || costumer.phone;
    costumer.image = image || costumer.image;
    costumer.id_product = id_product || costumer.id_product;
    costumer.id_upline = id_upline || costumer.id_upline;

    await costumer.save();

    res.send(costumer);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {addCostumer,getCostumers, addImageToCostumer, deleteCostumer, getCostumerById, getCostumersByUpline, getCostumerByName, updateCostumer };

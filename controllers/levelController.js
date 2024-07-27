const { Level } = require('../models');

const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.findAll();
    res.send(levels);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getLevelById = async (req, res) => {
  try {
    const level = await Level.findByPk(req.params.id);
    if (!level) {
      return res.status(404).send({ error: 'Level not found' });
    }
    res.send(level);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllLevels, getLevelById };

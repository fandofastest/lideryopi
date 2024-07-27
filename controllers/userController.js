const bcrypt = require('bcryptjs');
const { User } = require('../models');

const update = async (req, res) => {
  try {
    const { username, name, email, phone, password, id_level } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 8) : undefined;
    await req.user.update({ username, name, email, phone, password: hashedPassword, id_level });
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { username, status } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    user.status = status;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { update, updateStatus, getUserById, getUserByUsername };

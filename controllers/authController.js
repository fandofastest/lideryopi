const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
  try {
    const { username, name, email, phone, password, id_level } = req.body;

    // Validate required fields
    if (!username || !name || !email || !phone || !password || !id_level) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create the user
    const user = await User.create({ username, name, email, phone, password: hashedPassword, id_level, status: 'inactive' });

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Respond with user data and token
    res.status(201).send({ user, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).send({ error: 'Username and password are required' });
    }

    // Find the user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    // Check if the user's account is active
    if (user.status !== 'active') {
      return res.status(403).send({ error: 'Account is inactive' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Respond with user data and token
    res.send({ user, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = { register, login };

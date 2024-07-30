const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const costumerRoutes = require('./routes/costumerRoutes');
const levelRoutes = require('./routes/levelRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/costumers', costumerRoutes);
app.use('/levels', levelRoutes);
app.use('/products', productRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

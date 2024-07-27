const path = require('path');

// Handle image upload
const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    res.status(200).send({ imagePath: filePath });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = { uploadImage };

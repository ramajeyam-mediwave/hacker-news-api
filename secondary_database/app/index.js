const express = require('express');
require('dotenv').config();
const { searchController } = require('./controller/searchController');

const app = express();
const PORT = process.env.PORT

app.get('/search', async (req, res) => {
  try {
    await searchController(req, res); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

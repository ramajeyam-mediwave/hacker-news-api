const express = require('express');
const { scrapeNews } = require('./controller/newsController');
const userRouter = require('./routes/routes');

const app = express();
const PORT = process.env.PORT



app.use("/", userRouter);

// app.get('/', async (req, res) => {
//   try {
//     await scrapeNews(req, res); 
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const express = require("express");
const { scrapeNews } = require("../controller/newsController");
const { searchController } = require("../controller/searchController");
const userRouter = express.Router();

userRouter.post("/",scrapeNews);
userRouter.get("/search",searchController);





module.exports = userRouter;
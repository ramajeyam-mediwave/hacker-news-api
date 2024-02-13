const { sequelize, models, Sequelize } = require("../config/sequelize-config");
// const { models } = require("../config/sequelize-config");

const searchController = async (req, res) => {
  try {
    const { query } = req.query;

    const foundNews = await models.scrap.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: `%${query}%`
        }
      }
    });

    res.status(200).json({ results: foundNews });
  } catch (error) {
    console.error("Error searching for news titles:", error);
    res.status(500).json({ error: "An error occurred while searching for news titles" });
  }
};

module.exports = { searchController };

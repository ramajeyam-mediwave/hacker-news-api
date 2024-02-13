const puppeteer = require("puppeteer");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");

// Function to scrape news
const scrapeNews = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/");

    const allNews = await page.evaluate(() => {
      const titleList = document.body.querySelectorAll(".athing");
      let news = [];
      titleList.forEach((titleElement) => {
        const parentTr = titleElement.closest("tr");
        const ageElement = parentTr.nextElementSibling.querySelector(".age");
        const utcTime = ageElement.title.trim();
        const ISTOffset = 330;
        const ISTTime = new Date(utcTime);
        ISTTime.setMinutes(ISTTime.getMinutes() + ISTOffset);
        const time = ISTTime.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
        const data = {
          id: titleElement.id,
          title: titleElement.querySelector(".titleline a").innerText,
          link: titleElement.querySelector(".titleline a").href,
          time: time,
        };
        news.push(data);
      });
      return news;
    });

    await addNewsToDatabase(allNews);

    await browser.close();

    res.status(200).json({ message: "News scraped and added to the database successfully", allNews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while scraping and adding news to the database" });
  }
};

// Function to add news to the database
const addNewsToDatabase = async (newsList) => {
  try {
    for (const newsItem of newsList) {
      const existingNews = await models.scrap.findOne({
        where: { id: newsItem.id },
      });

      if (!existingNews) {
        await models.scrap.create({
          id: newsItem.id,
          title: newsItem.title,
          link: newsItem.link,
          time: newsItem.time,
        });
      }
    }
  } catch (error) {
    console.error("Error adding news to the database:", error);
    throw error;
  }
};

module.exports = { scrapeNews };

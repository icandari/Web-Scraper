const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route to scrape data
app.get("/api/courses", async (req, res) => {
  try {
    const url = "https://catalog.byuh.edu/computer-science-bs";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const courses = [];

    // Iterate through the tables that contain course data
    $(".TableRichTextElement-items table tbody tr").each((index, element) => {
      const courseNumber = $(element).find("td").eq(0).text().trim();
      const courseTitle = $(element).find("td").eq(1).text().trim();
      const semestersOffered = $(element).find("td").eq(2).text().trim();
      const creditHours = $(element).find("td").eq(3).text().trim();
      const prerequisites = $(element).find("td").eq(4).text().trim();

      if (courseNumber && courseTitle) {
        courses.push({
          courseNumber,
          courseTitle,
          semestersOffered,
          creditHours,
          prerequisites,
        });
      }
    });

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error scraping the data.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

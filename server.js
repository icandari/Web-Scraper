const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route to scrape data dynamically based on the provided URL
app.post("/api/courses", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  try {
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
    res.status(500).json({ error: "Failed to scrape the provided URL." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

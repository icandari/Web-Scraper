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

// Function to scrape a single URL
async function scrapeCourses(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const courses = [];
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
    return courses;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return [];
  }
}

// Route to scrape data for major and minors
app.post("/api/courses", async (req, res) => {
  const { majorUrl, minor1Url, minor2Url } = req.body;

  if (!majorUrl || !minor1Url || !minor2Url) {
    return res.status(400).json({ error: "All three URLs are required." });
  }

  try {
    const [majorCourses, minor1Courses, minor2Courses] = await Promise.all([
      scrapeCourses(majorUrl),
      scrapeCourses(minor1Url),
      scrapeCourses(minor2Url),
    ]);

    res.json({
      majorCourses,
      minor1Courses,
      minor2Courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to scrape one or more URLs." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

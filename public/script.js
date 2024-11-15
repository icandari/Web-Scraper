document.getElementById("submit-url").addEventListener("click", async () => {
    const url = document.getElementById("program-url").value.trim();
  
    if (!url) {
      alert("Please enter a valid URL.");
      return;
    }
  
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch course data. Please check the URL.");
      }
  
      const courses = await response.json();
  
      const coursesDiv = document.getElementById("courses");
      coursesDiv.innerHTML = "";
  
      if (courses.length === 0) {
        coursesDiv.innerHTML = "<p>No courses found for the provided URL.</p>";
        return;
      }
  
      courses.forEach((course) => {
        const courseDiv = document.createElement("div");
        courseDiv.style.border = "1px solid #ccc";
        courseDiv.style.margin = "10px";
        courseDiv.style.padding = "10px";
  
        courseDiv.innerHTML = `
          <h3>${course.courseNumber}: ${course.courseTitle}</h3>
          <p><strong>Semesters Offered:</strong> ${course.semestersOffered}</p>
          <p><strong>Credits:</strong> ${course.creditHours}</p>
          <p><strong>Prerequisites:</strong> ${course.prerequisites || "None"}</p>
        `;
  
        coursesDiv.appendChild(courseDiv);
      });
    } catch (error) {
      alert(error.message);
    }
  });
  
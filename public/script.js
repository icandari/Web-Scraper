document.getElementById("submit-urls").addEventListener("click", async () => {
    const majorUrl = document.getElementById("major-url").value.trim();
    const minor1Url = document.getElementById("minor1-url").value.trim();
    const minor2Url = document.getElementById("minor2-url").value.trim();
  
    if (!majorUrl || !minor1Url || !minor2Url) {
      alert("Please enter all three URLs.");
      return;
    }
  
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ majorUrl, minor1Url, minor2Url }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch course data. Please check the URLs.");
      }
  
      const { majorCourses, minor1Courses, minor2Courses } = await response.json();
  
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "";
  
      // Display major courses
      resultsDiv.innerHTML += "<h2>Major Courses</h2>";
      majorCourses.forEach((course) => {
        resultsDiv.innerHTML += `
          <div>
            <h3>${course.courseNumber}: ${course.courseTitle}</h3>
            <p><strong>Semesters Offered:</strong> ${course.semestersOffered}</p>
            <p><strong>Credits:</strong> ${course.creditHours}</p>
            <p><strong>Prerequisites:</strong> ${course.prerequisites || "None"}</p>
          </div>
          <hr>
        `;
      });
  
      // Display minor 1 courses
      resultsDiv.innerHTML += "<h2>Minor 1 Courses</h2>";
      minor1Courses.forEach((course) => {
        resultsDiv.innerHTML += `
          <div>
            <h3>${course.courseNumber}: ${course.courseTitle}</h3>
            <p><strong>Semesters Offered:</strong> ${course.semestersOffered}</p>
            <p><strong>Credits:</strong> ${course.creditHours}</p>
            <p><strong>Prerequisites:</strong> ${course.prerequisites || "None"}</p>
          </div>
          <hr>
        `;
      });
  
      // Display minor 2 courses
      resultsDiv.innerHTML += "<h2>Minor 2 Courses</h2>";
      minor2Courses.forEach((course) => {
        resultsDiv.innerHTML += `
          <div>
            <h3>${course.courseNumber}: ${course.courseTitle}</h3>
            <p><strong>Semesters Offered:</strong> ${course.semestersOffered}</p>
            <p><strong>Credits:</strong> ${course.creditHours}</p>
            <p><strong>Prerequisites:</strong> ${course.prerequisites || "None"}</p>
          </div>
          <hr>
        `;
      });
    } catch (error) {
      alert(error.message);
    }
  });
  
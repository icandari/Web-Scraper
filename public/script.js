document.getElementById("fetch-courses").addEventListener("click", async () => {
    const response = await fetch("/api/courses");
    const courses = await response.json();
  
    const coursesDiv = document.getElementById("courses");
    coursesDiv.innerHTML = "";
  
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
  });
  
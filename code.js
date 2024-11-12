function toggle(e) {
  const element = e.target;
  element.classList.toggle("active");
  // Toggle display of the description div
  const description = element.nextElementSibling;
  description.style.display =
    description.style.display === "block" ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", function () {
  ["section1", "section2", "section3"].forEach((id) => {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      sectionElement.addEventListener("click", toggle);
    }
  });

  // Fetch data and create dynamic accordion sections
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      const accordion = document.querySelector(".accordion");

      data.forEach((post) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("section");

        // Create title div with toggle
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("title");
        titleDiv.textContent = post.title;

        //  Description hidden content
        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("description");
        descriptionDiv.innerHTML = `<p>${post.body}</p>`;
        descriptionDiv.style.display = "none";

        // Add click event to title to toggle
        titleDiv.addEventListener("click", () => {
          titleDiv.classList.toggle("active");
          descriptionDiv.style.display =
            descriptionDiv.style.display === "none" ? "block" : "none";
        });

        // Append title and description to section, and section to accordion
        sectionDiv.appendChild(titleDiv);
        sectionDiv.appendChild(descriptionDiv);
        accordion.appendChild(sectionDiv);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

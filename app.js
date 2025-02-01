// Initialize jobs array with existing data from localStorage
const jobs = JSON.parse(localStorage.getItem("Jobs")) || [];

// Function to get form data and validate it
function getFormData() {
  const company = document.querySelector("#company").value.trim();
  const title = document.querySelector("#job").value.trim();
  const salary = document.querySelector("#salary").value.trim();
  const availability = document.querySelector("#availability").value.trim();

  return validateFormData({ company, title, salary, availability });
}

// Validate form data and return the job object if valid
function validateFormData({ company, title, salary, availability }) {
  const fields = {
    Company: company,
    Title: title,
    Salary: salary,
    Availability: availability,
  };
  let isValid = true;

  Object.entries(fields).forEach(([key, value]) => {
    if (!value) {
      createError(key, "can't be empty.");
      isValid = false;
    }
  });

  return isValid
    ? { id: jobs.length + 1, company, title, salary, availability }
    : null;
}

// Function to create an error message
function createError(field, message) {
  removeError(); // Clear existing error before showing a new one
  const errorMsg = document.createElement("p");
  errorMsg.classList.add("error-msg");
  errorMsg.innerHTML = `<span class="error-text">${field}</span> ${message}`;

  document.querySelector(".job-form-header").appendChild(errorMsg);
  setTimeout(removeError, 3000);
}

// Remove the last error message
function removeError() {
  const errorMessage = document.querySelector(".error-msg");
  if (errorMessage) errorMessage.remove();
}

// Store jobs in localStorage
function storeJobsLocalStorage() {
  localStorage.setItem("Jobs", JSON.stringify(jobs));
}

// Function to display success modal and close it on click
function showSuccessModal() {
  const modal = document.querySelector(".job-success-modal");
  modal.style.display = "block";
  modal.onclick = () => (modal.style.display = "none");
}

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("job-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const newJob = getFormData();
      if (!newJob) return;

      jobs.push(newJob);
      storeJobsLocalStorage();
      showSuccessModal();
      form.reset();
      showJobs(); // Refresh job listings
    });
  }
});

showJobs();

// Function to display jobs based on search input
function showJobs(searchTerm = "") {
  const jobContainer = document.getElementById("jobs");
  if (!jobContainer) return;
  jobContainer.innerHTML = "";

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(searchTerm) ||
      job.title.toLowerCase().includes(searchTerm) ||
      job.availability.toLowerCase().includes(searchTerm)
  );

  if (filteredJobs.length === 0) {
    jobContainer.innerHTML = `<p class="no-matching-jobs">No matching jobs found</p>`;
    return;
  }

  // Render filtered jobs
  filteredJobs.forEach((job) => {
    const div = document.createElement("div");
    div.classList.add("jobs");
    div.innerHTML = `
      <div class="jobs">
        <ul>
          <li class="company">${job.company}</li>
          <li class="title">${job.title}</li>
          <li>$${job.salary}k/Yearly</li>
          <li class="availability">${job.availability}</li>
        </ul>
      </div>`;
    jobContainer.appendChild(div);
  });
}

// Event listener for live search
const search = document.getElementById("search");
if (search) {
  search.addEventListener("keyup", (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    showJobs(searchTerm);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const hambargar = document.querySelector(".hambargar");
  const navMenu = document.querySelector(".nav-menu ul");

  // If these elements exist, execute the menu toggle logic
  if (hambargar && navMenu) {
    hambargar.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        hambargar.innerHTML = "&#9776;"; // ☰ (menu icon)
      } else {
        navMenu.classList.add("active");
        hambargar.innerHTML = "&#10006;"; // ✖ (close icon)
      }
    });
  } else {
    console.warn(
      "Hambargar menu not found on this page, skipping event listener."
    );
  }
});

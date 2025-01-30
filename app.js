// Create jobs array
const jobs = [];

// Create a form data object
const formData = {};

function getFormData(validateFormData) {
  const company = document.querySelector("#company").value;
  const title = document.querySelector("#job").value;
  const salary = document.querySelector("#salary").value;
  const availability = document.querySelector("#availability").value;

  return validateFormData(company, title, salary, availability);
}

// Flag for form validation success
function validateFormData(company, title, salary, availability) {
  let isValid = true;

  if (company.toLowerCase() === "") {
    createError("Company", "can't be empty.");
    isValid = false;
    setTimeout(() => {
      removeError();
    }, 3000);
  }
  if (title.toLowerCase() === "") {
    createError("Title", "can't be empty.");
    isValid = false;
    setTimeout(() => {
      removeError();
    }, 3000);
  }
  if (salary.toLowerCase() === "") {
    createError("Salary", "can't be empty.");
    isValid = false;
    setTimeout(() => {
      removeError();
    }, 3000);
  }
  if (availability.toLowerCase() === "") {
    createError("Availability", "can't be empty.");
    isValid = false;
    setTimeout(() => {
      removeError();
    }, 3000);
  }

  if (isValid) {
    formData.id = jobs.length + 1;
    formData.company = company;
    formData.title = title;
    formData.salary = salary;
    formData.availability = availability;
    return true;
  } else {
    // Return false if validation failed
    return false;
  }
}

// Create an error message
function createError(errorName, message) {
  const div = document.createElement("div");
  div.innerHTML = `<p class="error-msg"><span class="error-text">${errorName}</span> ${message}</p>`;

  const jobFormHeader = document.querySelector(".job-form-header");
  jobFormHeader.appendChild(div);
}

// Remove the last error message
function removeError() {
  const errorMessage = document.querySelector(".error-msg");
  if (errorMessage) {
    errorMessage.remove();
  }
}

// Store data to the localStorage
function storeJobsLocalStorage(jobs) {
  localStorage.setItem("Jobs", JSON.stringify(jobs));
}

// Push exsting the data to the array
function pushExstingData() {
  if (localStorage.length !== 0) {
    const data = localStorage.getItem("Jobs");
    jobs.push(JSON.parse(data));
  }
}
pushExstingData();

// Job success message
function jobSuccessMes() {
  const jobSuccessModal = document.querySelector(".job-success-modal");

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("job-success-modal")) {
      jobSuccessModal.style.display = "none";
    }
  });
}
jobSuccessMes();
// Handdle form submition
const form = document.getElementById("job-form");

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const res = getFormData(validateFormData);
    if (!res) {
      return;
    }
    console.log(jobs);
    const jobSuccessModal = document.querySelector(".job-success-modal");
    jobSuccessModal.style.display = "block";
    form.reset();

    if (Object.keys(formData).length !== 0) {
      jobs.push(formData);
      storeJobsLocalStorage(jobs);
    }
  });
});

// Show the jobs from localStorage
function showJobs() {
  jobs.forEach((job) => {
    job.forEach((j) => {
      const jobContainer = document.getElementById("jobs");
      const div = document.createElement("div");
      div.classList.add("jobs");
      div.innerHTML = `
  <div class="jobs">
    <ul>
        <li class="company">${j.company}</li>
        <li class="title">${j.title}</li>
        <li>$${j.salary}k/Yearly</li>
       <li class="availability">${j.availability}</li>
    </ul>
  </div>`;

      jobContainer.appendChild(div);
    });
  });
}
showJobs();

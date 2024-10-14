"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// Grab blog post links and modal elements
const blogPostLinks = document.querySelectorAll(".blog-post-link");
const modalCloseButtons = document.querySelectorAll(".close");

// Function to open the blog modal
function openBlogModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block"; // Show modal
}

// Function to close the blog modal
function closeBlogModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("hide"); // Add the hide class

  // Wait for the animation to finish before hiding the modal
  setTimeout(() => {
    modal.style.display = "none"; // Hide modal after animation
    modal.classList.remove("hide"); // Remove the hide class for future use
  }, 300); // Match this duration with the CSS transition duration
}

// Add click event listeners to each blog post link
blogPostLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    const modalId = this.getAttribute("data-blog-modal"); // Get modal ID
    openBlogModal(modalId); // Open modal
  });
});

// Add click event listeners to each modal close button
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const modalId = this.closest(".blog-modal").id; // Get modal ID from parent
    closeBlogModal(modalId); // Close modal
  });
});

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
        
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Skill load part
const resumeSection = document.getElementById("resumeName");
function animateSkills() {
  const progressBars = document.querySelectorAll('.skill-progress-fill');
  
  // Iterate over each progress bar and apply the width from data attribute
  progressBars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-width'); // Get the width from data attribute
    bar.style.width = targetWidth + '%'; // Apply the width
  });
}
function resetSkills() {
  const progressBars = document.querySelectorAll('.skill-progress-fill');

  // Reset each progress bar to 0% width
  progressBars.forEach(bar => {
    bar.style.width = '0%'; // Reset the width to 0%
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills(); // Animate skills when the Resume section is in view
    }
    else{
      resetSkills(); // Reset skills when leaving the Resume section
    }
  });
}, {
  threshold: 0.1 // Adjust this value based on when you want to trigger the animation
});
observer.observe(resumeSection);

// Leetcode Stats Chart

const apiUrl = "https://leetcode-api-faisalshohag.vercel.app/vineetverma123";
const solvedCount = document.getElementById("solved-count");
const easyCount = document.getElementById("easy-count");
const mediumCount = document.getElementById("medium-count");
const hardCount = document.getElementById("hard-count");
const rankCount = document.getElementById("rank");
const circle = document.querySelector(".circle");

// Function to update stats
function updateStats(data) {
  // Fallback to prevent undefined values
  const totalQuestions = data.totalQuestions || 3308;
  const solved = data.totalSolved || 0;
  const easy = data.easySolved || 0;
  const medium = data.mediumSolved || 0;
  const hard = data.hardSolved || 0;
  const totalEasy = data.totalEasy || 828;
  const totalMedium = data.totalMedium || 1731;
  const totalHard = data.totalHard || 749;
  const rank = data.ranking || 1;

  const unsolvedCount = totalQuestions - solved;

  // Update the circular chart's conic gradient (no rotation)
  circle.style.background = `conic-gradient(
    #008080 0deg,
    #008080 calc(${solved} / ${totalQuestions} * 360deg),
    #ffcc00 calc(${solved} / ${totalQuestions} * 360deg) calc((${solved} + ${unsolvedCount}) / ${totalQuestions} * 360deg),
    #e74c3c calc((${solved} + ${unsolvedCount}) / ${totalQuestions} * 360deg) 360deg
  )`;

  // Update text values
  solvedCount.textContent = `${solved}/${totalQuestions}`;
  easyCount.textContent = `${easy}/${totalEasy}`;
  mediumCount.textContent = `${medium}/${totalMedium}`;
  hardCount.textContent = `${hard}/${totalHard}`;
  rankCount.textContent = `${rank}`;
}

// Async function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Log the raw data to check the structure
    console.log("API Response:", data);

    updateStats(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Fetch data every 10 seconds
setInterval(fetchData, 10000);

// Initial fetch to display data on page load
fetchData();

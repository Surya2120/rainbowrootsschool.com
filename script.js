document.addEventListener("DOMContentLoaded", () => {
  // 1. Learn More button click → go to About page
  function learnMore() {
    window.location.href = "about.html";
  }

  // 2. Highlight selected program box
  function highlightService(serviceId) {
    const boxes = document.querySelectorAll('.program-boxes .box');
    boxes.forEach(box => box.classList.remove('highlight'));

    const selectedBox = Array.from(boxes).find(box =>
      box.textContent.trim().toLowerCase().includes(serviceId)
    );

    if (selectedBox) {
      selectedBox.classList.add('highlight');
      selectedBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Add style for highlighted box
  const style = document.createElement('style');
  style.innerHTML = `
    .program-boxes .box.highlight {
      background-color: #ffcc00 !important;
      color: #000;
      box-shadow: 0 0 15px rgba(255, 204, 0, 0.7);
      transform: scale(1.05);
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(style);

  // 3. Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 4. Basic form validation
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      const inputs = form.querySelectorAll("input");
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
        }
      });
      if (!valid) {
        e.preventDefault();
        alert("Please fill all the fields.");
      }
    });
  }

  // 5. AOS Initialization
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  // 6. Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector("nav ul");
  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("open");
      menuToggle.classList.toggle("open");
    });
  }

  // 7. Shrink header on scroll
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });

  // 8. Slider Auto Transition every 5 seconds
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  const progress = document.querySelector(".progress");
  const toggleBtn = document.getElementById("toggleSlider");

  let intervalId;
  let isPaused = false;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });

    if (progress) {
      progress.style.animation = "none";
      void progress.offsetWidth;
      progress.style.animation = isPaused ? "none" : "progressAnim 5s linear infinite";
    }
  }

  function startSlider() {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      showSlide(currentIndex);
    }, 5000);
    showSlide(currentIndex);
  }

  function stopSlider() {
    clearInterval(intervalId);
    if (progress) {
      progress.style.animation = "none";
    }
  }

  toggleBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    toggleBtn.textContent = isPaused ? "Play" : "Pause";
    if (isPaused) {
      stopSlider();
    } else {
      startSlider();
    }
  });

  // Start on load
  startSlider();
});




// ============================
// HAMBURGER MENU TOGGLE
// ============================

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("mainNav");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });

});
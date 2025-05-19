//START SWIPER FOR EVENTS ON ABOUT US PAGE
const swiper = new Swiper(".big-card-clw", {
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: ".swiper-button.right",
    prevEl: ".swiper-button.left",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

//END SWIPER FOR EVENTS ON ABOUT US PAGE

//START SWIPER FOR ALL PRODUCTS PAGE
if (window.innerWidth < 992) {
  const swiper = new Swiper(".what-we-do_wrap", {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: ".swiper-button.right",
      prevEl: ".swiper-button.left",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
    },
  });
}
//END SWIPER FOR ALL PRODUCTS PAGE
console.log("test-cl");

//START SWIPER FOR OPEN PRODUCTS PAGE
if (window.innerWidth < 479) {
  const benSwiper = new Swiper("[benefits-swiper]", {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: ".swiper-button.right",
      prevEl: ".swiper-button.left",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
//END SWIPER FOR OPEN PRODUCTS PAGE

// Select the elements
const heroSection = document.querySelector("[custom-hero-section]");
const globalHeader = document.querySelector("[global-header]");

// Create the ScrollTrigger
ScrollTrigger.create({
  trigger: heroSection,
  start: "top 1%",
  end: "bottom 1%",
  // markers: true,
  onEnter: () => globalHeader.classList.add("custom-dark-bg"), // Add class when entering
  onLeave: () => globalHeader.classList.remove("custom-dark-bg"), // Remove class when leaving
  onEnterBack: () => globalHeader.classList.add("custom-dark-bg"), // Add class when entering back
  onLeaveBack: () => globalHeader.classList.remove("custom-dark-bg"), // Remove class when leaving back
});

const headerSection = document.querySelector(".section.for-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    gsap.to(headerSection, { backdropFilter: "blur(4px)", duration: 0.3 });
  } else {
    gsap.to(headerSection, { backdropFilter: "blur(0px)", duration: 0.3 });
  }
});

document.querySelectorAll(".nav-link_item").forEach((item) => {
  item.style.opacity = "0";
});

//NAV LINKS START

// Links reveal Start
document.querySelectorAll(".nav-link_item").forEach((item) => {
  item.style.opacity = "0";
});

document.querySelectorAll(".nav-link_cont").forEach((container) => {
  const target = container.querySelector(".nav-link_target");
  const items = target.querySelectorAll(".nav-link_target-cont .nav-link_item");

  container.addEventListener("mouseenter", () => {
    // Kill any ongoing animations on mouse enter to prevent conflicts
    gsap.killTweensOf([target, items]);

    gsap.to(target, {
      height: "auto",
      duration: 0.4,
      ease: "power1.inOut",
    });

    gsap.to(items, {
      opacity: 1,
      duration: 0.6,
      delay: 0.2, // Start this animation 0.2 seconds after the height animation begins
      stagger: 0.1,
      ease: "power1.inOut",
    });
  });

  container.addEventListener("mouseleave", () => {
    // Kill any ongoing animations on mouse leave to ensure the leave animation runs
    gsap.killTweensOf([target, items]);

    gsap.to(items, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: () => {
        // Clear inline styles after animation completes
        gsap.set(items, { clearProps: "opacity" });
      },
    });

    gsap.to(target, {
      height: 0,
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: () => {
        // Clear inline styles after animation completes
        gsap.set(target, { clearProps: "height" });
      },
    });
  });
});

const trigger = document.querySelector("[mob-nav-stagger-trigger]");
const itemsTl = document.querySelectorAll("[mob-nav-stagger]");

let isOpen = false;

trigger.addEventListener("click", () => {
  if (!isOpen) {
    gsap.fromTo(
      itemsTl,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power1.out",
      }
    );
  } else {
    gsap.to(itemsTl, {
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power1.in",
    });
  }
  isOpen = !isOpen;
});

//NAV LINKS END

document.addEventListener("click", function (e) {
  const modalSection = document.querySelector(".section.for-modal");
  if (!modalSection) return;

  // === OPEN MODAL ===
  const openTrigger = e.target.closest("[publication-details]");
  if (openTrigger && !modalSection.contains(openTrigger)) {
    const detailValue = openTrigger.getAttribute("publication-details");

    modalSection.classList.add("active");

    // Hide all detail blocks and reset modal-cont
    modalSection.querySelectorAll("[publication-details]").forEach((item) => {
      item.style.display = "none";
      const modalCont = item.querySelector(".modal-cont");
      if (modalCont) modalCont.classList.remove("active");
    });

    // Show the matched block
    const matchedItem = modalSection.querySelector(
      `[publication-details="${detailValue}"]`
    );
    if (matchedItem) {
      matchedItem.style.display = "block";
      const modalCont = matchedItem.querySelector(".modal-cont");
      if (modalCont) modalCont.classList.add("active");
    }

    return; // Prevent falling into close logic
  }

  // === CLOSE MODAL on Click ===
  if (
    e.target.hasAttribute("close-modal") ||
    e.target.closest("[close-modal]")
  ) {
    closeModal(modalSection);
  }
});

// === CLOSE MODAL on Escape ===
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modalSection = document.querySelector(".section.for-modal");
    if (modalSection && modalSection.classList.contains("active")) {
      closeModal(modalSection);
    }
  }
});

// === CLOSE FUNCTION ===
function closeModal(modalSection) {
  modalSection.classList.remove("active");

  modalSection.querySelectorAll("[publication-details]").forEach((item) => {
    item.style.display = "none";
    const modalCont = item.querySelector(".modal-cont");
    if (modalCont) modalCont.classList.remove("active");
  });
}

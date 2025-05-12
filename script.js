const headerSection = document.querySelector(".section.for-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    gsap.to(headerSection, { backdropFilter: "blur(4px)", duration: 0.3 });
  } else {
    gsap.to(headerSection, { backdropFilter: "blur(0px)", duration: 0.3 });
  }
});

//Links reveal
document.querySelectorAll(".nav-link_item").forEach((item) => {
  item.style.opacity = "0";
});
document.querySelectorAll(".nav-link_cont").forEach((container) => {
  const target = container.querySelector(".nav-link_target");
  const items = target.querySelectorAll(".nav-link_target-cont .nav-link_item");

  document.querySelectorAll(".nav-link_cont").forEach((container) => {
    const target = container.querySelector(".nav-link_target");
    const items = target.querySelectorAll(
      ".nav-link_target-cont .nav-link_item"
    );

    container.addEventListener("mouseenter", () => {
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
      gsap.to(items, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.inOut",
      });
      gsap.to(target, {
        height: 0,
        duration: 0.3,
        ease: "power1.inOut",
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
});

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

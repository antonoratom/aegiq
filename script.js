//START PUBLICATIONS MODAL
const modalSection = document.querySelector(".section.for-modal");

const closeModal = () => {
  modalSection.classList.remove("active");
  modalSection.querySelectorAll("[publication-details]").forEach((item) => {
    item.style.display = "none";
    item.querySelector(".modal-cont")?.classList.remove("active");
  });
};

document.addEventListener("click", (e) => {
  if (!modalSection) return;

  const openTrigger = e.target.closest("[publication-details]");
  if (openTrigger && !modalSection.contains(openTrigger)) {
    const detailValue = openTrigger.getAttribute("publication-details");

    modalSection.classList.add("active");
    modalSection.querySelectorAll("[publication-details]").forEach((item) => {
      item.style.display = "none";
      item.querySelector(".modal-cont")?.classList.remove("active");
    });

    const matched = modalSection.querySelector(
      `[publication-details="${detailValue}"]`
    );
    if (matched) {
      matched.style.display = "block";
      matched.querySelector(".modal-cont")?.classList.add("active");
    }
    return;
  }

  if (
    e.target.hasAttribute("close-modal") ||
    e.target.closest("[close-modal]")
  ) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalSection?.classList.contains("active")) {
    closeModal();
    if (typeof lenis !== "undefined") lenis.start();
  }
});
//END PUBLICATIONS MODAL

//START GUEST & TAGS RECALCULATIONS
const updateCollectionItems = () => {
  const hasPublications = document.querySelector("[publication-guests-amount]");
  const hasPodcasts = document.querySelector(".host-guest_cli");

  document.querySelectorAll(".content-cli").forEach((item) => {
    const items = item.querySelectorAll("[items-to-calc]");
    const limit = item.offsetWidth * 0.7;
    let width = 0,
      top = null,
      hidden = 0;

    items.forEach((el) => {
      const w = el.offsetWidth,
        t = el.offsetTop;
      if (top === null) top = t;

      if (t === top && width + w <= limit) {
        width += w;
        el.style.display = "block";
      } else {
        el.style.display = "none";
        hidden++;
      }
    });

    const counter = item.querySelector("[items-amount]");
    if (counter) {
      counter.textContent = `+${hidden}`;
      const parent = counter.parentElement;
      parent.style.display = hidden > 0 ? "block" : "none";
    }

    if (hasPublications) {
      const pubGuests = item.querySelectorAll(
        "[publication-guests-amount]"
      ).length;
      const pubTarget = item.querySelector("[publication-guests-target]");
      if (pubTarget) {
        pubTarget.style.display = "block"; // Ensure it's visible
        if (pubGuests === 1) {
          pubTarget.textContent = "+1 Guest";
        } else if (pubGuests > 1) {
          pubTarget.textContent = `+${pubGuests} Guests`;
        } else {
          pubTarget.style.display = "none";
          const dot = pubTarget.nextElementSibling;
          if (dot?.hasAttribute("guests-dot")) dot.style.display = "none";
        }
      }
    }

    if (hasPodcasts) {
      const podcastGuests = item.querySelectorAll(".host-guest_cli").length - 1;
      const podcastTarget = item.querySelector("[guests-target]");
      if (podcastTarget) {
        if (podcastGuests === 1) podcastTarget.textContent = "+1 Guest";
        else if (podcastGuests > 1)
          podcastTarget.textContent = `+${podcastGuests} Guests`;
        else {
          podcastTarget.style.display = "none";
          const dot = podcastTarget.nextElementSibling;
          if (dot?.hasAttribute("guests-dot")) dot.style.display = "none";
        }
      }
    }
  });
};

const observeCollectionListUpdates = () => {
  const node = document.querySelector(".content-cl");
  if (!node) return;

  const config = { childList: true, subtree: true };

  const observer = new MutationObserver((mutations, obs) => {
    if (mutations.some((m) => m.type === "childList")) {
      obs.disconnect();
      updateCollectionItems();
      obs.observe(node, config);
    }
  });

  observer.observe(node, config);
};

updateCollectionItems();
observeCollectionListUpdates();
//END GUEST & TAGS RECALCULATIONS

//HERO SCROLL START
const heroSection = document.querySelector("[custom-hero-section]");
const globalHeader = document.querySelector("[global-header]");

if (heroSection && globalHeader) {
  ScrollTrigger.create({
    trigger: heroSection,
    start: "top 1%",
    end: "bottom 1%",
    // markers: true,
    toggleClass: { targets: globalHeader, className: "custom-dark-bg" },
  });
}
const headerSection = document.querySelector(".section.for-header");

if (headerSection) {
  let isBlurred = false;

  window.addEventListener("scroll", () => {
    const scrolledPast = window.scrollY > 100;

    if (scrolledPast && !isBlurred) {
      isBlurred = true;
      gsap.to(headerSection, {
        backdropFilter: "blur(20px)",
        backgroundColor: "var(--_colors---opacity--light-opacity-s-40-60)",
        duration: 0.3,
      });
    } else if (!scrolledPast && isBlurred) {
      isBlurred = false;
      gsap.to(headerSection, {
        backdropFilter: "blur(0px)",
        backgroundColor: "transparent",
        duration: 0.3,
      });
    }
  });
}
//HERO SCROLL END

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

//START ALL SWIPERS
if (document.querySelector(".swiper")) {
  //START SWIPER FOR FEEDBACKS ON HOME PAGE
  const feedbackSwiper = new Swiper("[feedback-swiper]", {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: "[swiper-arrow-right='feedback']",
      prevEl: "[swiper-arrow-left='feedback']",
    },
    pagination: {
      el: "[swiper-pagination='feedback']",
      clickable: true,
    },
  });
  //END SWIPER FOR FEEDBACKS ON HOME PAGE

  //START SWIPER FOR PRODUCTS ON MULTIPLE PAGES
  const productsSwiper = new Swiper("[product-swiper]", {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: "[swiper-arrow-right='product']",
      prevEl: "[swiper-arrow-left='product']",
    },
    pagination: {
      el: "[swiper-pagination='product']",
      clickable: true,
    },
  });
  //END SWIPER FOR PRODUCTS ON MULTIPLE PAGES

  //START SWIPER FOR EVENTS ON ABOUT US PAGE
  const bigSwiperWrap = new Swiper("[big-card-swiper]", {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: ".swiper-button.right",
      prevEl: ".swiper-button.left",
    },
    pagination: {
      el: ".swiper-big-pagination",
      clickable: true,
    },
  });
  //END SWIPER FOR EVENTS ON ABOUT US PAGE

  //START SWIPER FOR ALL PRODUCTS PAGE
  if (window.innerWidth < 992) {
    const swiper = new Swiper(".what-we-do_wrap.swiper", {
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

  //START SWIPER FOR OPEN ARTICLES PREVIEWS
  if (window.innerWidth < 990) {
    const swiperContainer = document.querySelector("[blog-preview]");
    const newsSwiper = new Swiper(swiperContainer, {
      spaceBetween: 16,
      navigation: {
        nextEl: swiperContainer.parentNode.querySelector(
          ".swiper-button.right"
        ),
        prevEl: swiperContainer.parentNode.querySelector(".swiper-button.left"),
      },
      pagination: {
        el: swiperContainer.parentNode.querySelector(".swiper-pagination"),
        clickable: true,
      },
      breakpoints: {
        200: {
          slidesPerView: 1,
        },
        500: {
          slidesPerView: 2,
        },
      },
    });
  }
  //END SWIPER FOR OPEN ARTICLES PREVIEWS
}
//END ALL SWIPERS

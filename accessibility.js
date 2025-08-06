// HERO SCROLL START
const heroSection = document.querySelector("[custom-hero-section]");
const globalHeader = document.querySelector("[global-header]");
const globalHeaderBg = document.querySelector("[for-header-bg]");
globalHeaderBg.classList.remove('custom-dark-bg');

if (heroSection && globalHeader) {
  ScrollTrigger.create({
    trigger: heroSection,
    start: "top 1%",
    end: "bottom 1%",
    // markers: true,
    immediateRender: false,
    toggleClass: { targets: globalHeaderBg, className: "custom-dark-bg" },
  });
}

if (globalHeader) {
  let isBlurred = false;

  // Get initial padding values
  const computedStyle = window.getComputedStyle(globalHeader);
  const initialPaddingTop = parseFloat(computedStyle.paddingTop);
  const initialPaddingBottom = parseFloat(computedStyle.paddingBottom);

  window.addEventListener("scroll", () => {
    const scrolledPast = window.scrollY > 100;

    if (scrolledPast && !isBlurred) {
      isBlurred = true;
      gsap.to(globalHeader, {
        paddingTop: initialPaddingTop / 3 + "px",
        paddingBottom: initialPaddingBottom / 3 + "px",
        duration: 0.3,
      });
      gsap.to(
        globalHeaderBg,
        {
          backdropFilter: "blur(20px)",
          backgroundColor: "var(--_colors---opacity--light-opacity-s-40-60)",
          duration: 0.3,
        },
        0
      );
    } else if (!scrolledPast && isBlurred) {
      isBlurred = false;
      gsap.to(globalHeader, {
        paddingTop: initialPaddingTop + "px",
        paddingBottom: initialPaddingBottom + "px",
        duration: 0.3,
      });
      gsap.to(
        globalHeaderBg,
        {
          backdropFilter: "blur(0px)",
          backgroundColor: "transparent",
          duration: 0.3,
        },
        0
      );
    }
  });
}

//HERO SCROLL END

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
      // navigation: {
      //   nextEl: ".swiper-button.right",
      //   prevEl: ".swiper-button.left",
      // },
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
      // navigation: {
      //   nextEl: ".swiper-button.right",
      //   prevEl: ".swiper-button.left",
      // },
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
      // navigation: {
      //   nextEl: swiperContainer.parentNode.querySelector(
      //     ".swiper-button.right"
      //   ),
      //   prevEl: swiperContainer.parentNode.querySelector(".swiper-button.left"),
      // },
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

//PAGINATION OBSERVER
document.addEventListener("DOMContentLoaded", function () {
  const paginationWrapper = document.querySelector(
    ".w-pagination-wrapper.pagination"
  );

  if (!paginationWrapper) return;

  const updateVisibility = () => {
    const items = paginationWrapper.querySelectorAll(".for-paginatione");
    paginationWrapper.style.display = items.length <= 1 ? "none" : "";
  };

  // Run initial check after 1 second
  setTimeout(() => {
    updateVisibility();

    // Re-check every 500ms
    setInterval(updateVisibility, 50);
  }, 1000);
});

// NEW CODE
// NAV LINKS START
document.addEventListener("DOMContentLoaded", () => {
  // Helper functions
  const setTabIndex = (elements, value) => {
    if (Array.isArray(elements)) {
      elements.forEach((el) => el.setAttribute("tabindex", value));
    } else {
      elements.setAttribute("tabindex", value);
    }
  };

  const animateElements = (target, value, options = {}) => {
    const defaults = {
      duration: 0.3,
      ease: "power1.inOut",
    };
    return gsap.to(target, { ...defaults, ...options, ...value });
  };

  const checkFocusAndHide = (container, target, hideCallback) => {
    setTimeout(() => {
      if (
        !container.contains(document.activeElement) &&
        !target.contains(document.activeElement)
      ) {
        hideCallback();
      }
    }, 0);
  };

  const isTouchDevice = () => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  document.querySelectorAll(".nav-link_item").forEach((item) => {
    item.style.opacity = "0";
    setTabIndex(item, "-1");
  });

  document.querySelectorAll(".nav-link_cont").forEach((container) => {
    const target = container.querySelector(".nav-link_target");
    const items = target.querySelectorAll(
      ".nav-link_target-cont .nav-link_item"
    );
    const trigger = container.querySelector(".nav-link_trigger");
    const navLinkItems = target.querySelectorAll(".nav-link_item");
    const icon = container.querySelector(".u-icon.cc-16");
    let isDropdownOpen = false;

    setTabIndex(target, "-1");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-expanded", "false");

    const rotateIcon = () => {
      if (icon) {
        gsap.to(icon, {
          rotation: 180,
          duration: 0.3,
          ease: "power1.inOut",
        });
      }
    };

    const resetIcon = () => {
      if (icon) {
        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: "power1.inOut",
        });
      }
    };

    const showDropdown = () => {
      if (isDropdownOpen) return;

      gsap.killTweensOf([target, items]);

      animateElements(target, { height: "auto" }, { duration: 0.4 });
      animateElements(
        items,
        { opacity: 1 },
        {
          duration: 0.6,
          delay: 0.2,
          stagger: 0.1,
        }
      );

      setTabIndex([...items, target], "0");
      trigger.setAttribute("aria-expanded", "true");
      isDropdownOpen = true;

      // Rotate icon
      rotateIcon();
    };

    const hideDropdown = () => {
      if (!isDropdownOpen) return;

      gsap.killTweensOf([target, items]);

      animateElements(
        items,
        { opacity: 0 },
        {
          onComplete: () => gsap.set(items, { clearProps: "opacity" }),
        }
      );

      animateElements(
        target,
        { height: 0 },
        {
          onComplete: () => gsap.set(target, { clearProps: "height" }),
        }
      );

      setTabIndex([...items, target], "-1");
      trigger.setAttribute("aria-expanded", "false");
      isDropdownOpen = false;
      resetIcon();
    };

    const toggleDropdown = () => {
      if (isDropdownOpen) {
        hideDropdown();
      } else {
        showDropdown();
      }
    };

    if (isTouchDevice()) {
      // Prevent default hover behavior on touch devices
      container.addEventListener("touchstart", (e) => {
        e.stopPropagation();
      });
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown();
      });

      document.addEventListener("click", (e) => {
        if (!container.contains(e.target) && isDropdownOpen) {
          hideDropdown();
        }
      });

      target.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    } else {
      container.addEventListener("mouseenter", showDropdown);
      container.addEventListener("mouseleave", hideDropdown);
    }

    // Keyboard accessibility (works for both mobile and desktop)
    trigger.addEventListener("blur", () => {
      checkFocusAndHide(container, target, hideDropdown);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        toggleDropdown();

        if (isDropdownOpen && items[0]) {
          setTimeout(() => items[0].focus(), 100);
        }
      }
    });

    navLinkItems.forEach((link) => {
      link.addEventListener("focus", showDropdown);

      link.addEventListener("blur", () => {
        checkFocusAndHide(trigger, target, hideDropdown);
      });

      link.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          hideDropdown();
          trigger.focus();
        }
      });
    });
  });

  //Mobile navigation toggle
  const mobileTrigger = document.querySelector("[mob-nav-stagger-trigger]");
  const mobileItems = document.querySelectorAll("[mob-nav-stagger]");
  let isMobileOpen = false;

  mobileTrigger?.addEventListener("click", () => {
    const animationProps = isMobileOpen
      ? { opacity: 0, duration: 0.2, stagger: 0.05, ease: "power1.in" }
      : { opacity: 1, duration: 0.6, stagger: 0.1, ease: "power1.out" };

    if (!isMobileOpen) {
      gsap.fromTo(mobileItems, { opacity: 0 }, animationProps);
    } else {
      gsap.to(mobileItems, animationProps);
    }

    isMobileOpen = !isMobileOpen;
  });
});
// NAV LINKS END

// COLOR SWITCHER
function initializeColorMode() {
  const checkbox = document.querySelector("[color-switcher]");
  const label = document.querySelector('label[for="theme-toggle"]');

  const savedMode = localStorage.getItem("color-mode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldBeDark = savedMode ? savedMode === "dark" : prefersDark;

  if (shouldBeDark) {
    document.body.classList.add("dark-mode");
    checkbox.checked = true;
  }

  function updateColorMode() {
    const isDark = checkbox.checked;
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("color-mode", isDark ? "dark" : "light");
    checkbox.setAttribute("aria-checked", isDark);
  }

  checkbox.addEventListener("change", updateColorMode);

  checkbox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      updateColorMode();
    }
  });

  label?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      updateColorMode();
    }
  });

  checkbox.setAttribute("aria-checked", checkbox.checked);
}
document.addEventListener("DOMContentLoaded", initializeColorMode);

// LOGO TWINS FOR SHADOW PULSE ON HOVER OVER SVG LOGO
const elements = document.querySelectorAll("[logo-twin-trigger]");
elements.forEach((element) => {
  const clone = element.cloneNode(true);
  clone.classList.add("logo-twin");
  element.parentNode.insertBefore(clone, element.nextSibling);
});

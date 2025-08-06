//Dynamic filters controls
if (window.innerWidth < 991) {
  const simulateClick = (target) =>
    target.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true })
    );

  document.querySelectorAll("[filters-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const target = document.querySelector("[filters-target]");
      if (target) simulateClick(target);
    });
  });
  const filterElements = document.querySelectorAll(
    '[fs-list-element="filters"]'
  );
  filterElements.forEach((element) => {
    element.setAttribute("fs-list-filteron", "submit");
  });
}

// Dynamic tabs underline
function dynamicTabInit() {
  // Helper: Get left position relative to .tabs-filters_section
  function getDynamicTabRelativeLeft(
    element,
    sectionSelector = ".tabs-filters_section"
  ) {
    const dynamicTabSection = element.closest(sectionSelector);
    if (!dynamicTabSection) return null;
    const elementRect = element.getBoundingClientRect();
    const sectionRect = dynamicTabSection.getBoundingClientRect();
    return elementRect.left - sectionRect.left;
  }

  // Helper: Set width and left of .active-tab-line
  function updateActiveTabLine(width, left) {
    const dynamicTabLine = document.querySelector(".active-tab-line");
    if (dynamicTabLine) {
      dynamicTabLine.style.width = `${width}px`;
      dynamicTabLine.style.left = `${left}px`;
    }
  }

  // Get all filter-tag radio buttons
  const dynamicTabRadioButtons = Array.from(
    document.querySelectorAll("[fs-list-field='filter-tag']")
  );

  // Helper: Get the first parent item (customize selector as needed)
  function getDynamicTabParentItem(radioBtn) {
    return (
      radioBtn.closest(".dynamicTab-parent-item") || radioBtn.parentElement
    );
  }

  // Update .active-tab-line to active radio's parent metrics
  function updateDynamicTabLineToActiveRadio() {
    if (window.innerWidth <= 991) {
      // Optionally reset the active-tab-line on small screens
      updateActiveTabLine(0, 0);
      return;
    }
    const dynamicTabActiveRadio = dynamicTabRadioButtons.find(
      (radio) => radio.checked
    );
    if (dynamicTabActiveRadio) {
      const dynamicTabParentItem = getDynamicTabParentItem(
        dynamicTabActiveRadio
      );
      if (dynamicTabParentItem) {
        const dynamicTabWidth = dynamicTabParentItem.offsetWidth;
        const dynamicTabLeft = getDynamicTabRelativeLeft(dynamicTabParentItem);
        updateActiveTabLine(dynamicTabWidth, dynamicTabLeft);
        console.log(
          `[dynamicTab] Width: ${dynamicTabWidth}px, Left: ${dynamicTabLeft}px`
        );
      }
    }
  }

  // Listen for changes: update .active-tab-line on radio change
  dynamicTabRadioButtons.forEach((dynamicTabRadio) => {
    dynamicTabRadio.addEventListener("change", function () {
      if (this.checked && window.innerWidth > 991) {
        updateDynamicTabLineToActiveRadio();
      }
    });
  });

  // Initial run
  updateDynamicTabLineToActiveRadio();

  // Listen for resize to update or reset line
  window.addEventListener("resize", updateDynamicTabLineToActiveRadio);
}

// Only run if screen is wide enough
if (window.innerWidth > 991) {
  dynamicTabInit();
} else {
  // Listen for resize: if window becomes wide enough, initialize
  function dynamicTabResizeHandler() {
    if (window.innerWidth > 991) {
      dynamicTabInit();
      window.removeEventListener("resize", dynamicTabResizeHandler);
    }
  }
  window.addEventListener("resize", dynamicTabResizeHandler);
}

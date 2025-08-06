const bigButtons = document.querySelectorAll('a[data-wf--button--variant="big"], a[data-wf--button--variant="secondary"]');

bigButtons.forEach(button => {
  const shadowWrap = document.createElement('div');
  shadowWrap.className = 'button-shadow-wrap';
  button.parentNode.replaceChild(shadowWrap, button);
  shadowWrap.appendChild(button);
});


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
const collectionItemBl = document.querySelectorAll(".content-cli");

// Check if publication-guests-trigger exists anywhere on the page
const hasPublicationGuestsTrigger = document.querySelector("[publication-guests-trigger]") !== null;

collectionItemBl.forEach((item, index) => {
    const collectionItemWidth = item.offsetWidth - 64;
    let tags = Array.from(item.querySelectorAll(".tag_cli"));

    const calculateTotalTagWidth = () => {
        return tags.reduce((sum, tag) => sum + tag.offsetWidth, 0);
    };

    let totalTagWidth = calculateTotalTagWidth(); 
    let hiddenTagsCount = 0;

    while (totalTagWidth > collectionItemWidth && tags.length > 0) {
        const lastTag = tags[tags.length - 1];
        lastTag.style.display = 'none';
        tags.pop();
        totalTagWidth = calculateTotalTagWidth();
        hiddenTagsCount++;
    }

    if (hiddenTagsCount > 0) {
        const forNumbersTag = item.querySelector(".item-card_tag.for-numbers");
        forNumbersTag.style.display = 'block';
        forNumbersTag.textContent = `+${hiddenTagsCount}`;
    }

    // Only execute this part if publication-guests-trigger exists on the page
    if (hasPublicationGuestsTrigger) {
        const pubGuests = item.querySelectorAll("[publication-guests-trigger]");
        console.log(`Item ${index + 1}: Number of pubGuests: ${pubGuests.length}`);

        const pubTarget = item.querySelector("[publication-guests-target]");
        if (pubTarget && pubGuests.length == 1) {
            pubTarget.textContent = `+ ${pubGuests.length} Guest`;
        }
        if (pubTarget && pubGuests.length > 1) {
            pubTarget.textContent = `+ ${pubGuests.length} Guests`;
        }
    }
});

//END GUEST & TAGS RECALCULATIONS

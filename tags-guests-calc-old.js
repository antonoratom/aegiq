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
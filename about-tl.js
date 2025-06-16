document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Select all .story-tl-cli elements
  const storyItems = document.querySelectorAll(".story-tl-cli");

  storyItems.forEach((item) => {
    // Animate .tl_circle
    const tlCircle = item.querySelector(".tl_circle");
    if (tlCircle) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        end: "bottom 80%",
        // markers: true,
        toggleClass: { targets: tlCircle, className: "active" },
        onEnterBack: () => tlCircle.classList.add("active"),
        onLeave: () => tlCircle.classList.add("active"),
        onLeaveBack: () => tlCircle.classList.remove("active"),
      });
    }

    // Animate .tl_line-growth
    const tlLineGrowth = item.querySelector(".tl_line-growth");
    if (tlLineGrowth) {
      gsap.fromTo(
        tlLineGrowth,
        { height: "0%" },
        {
          height: "100%",
          scrollTrigger: {
            trigger: item,
            markers: true,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 1,
          },
        }
      );
    }
  });
});

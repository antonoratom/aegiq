// Configuration object for the animation
const iconConfig = {
  animation: {
    duration: 4, // seconds for animation
  },
  shadow: {
    // Initial state (0% and 100%)
    initial: {
      shadow1: {
        blur: 8, // px
        opacity: 0.2
      },
      shadow2: {
        blur: 4, // px
        opacity: 0.1
      }
    },
    // Peak state (50%)
    peak: {
      shadow1: {
        blur: 12, // px
        opacity: 0.55
      },
      shadow2: {
        blur: 4, // px
        opacity: 0.5
      }
    }
  }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all range inputs
  const rangeInputs = document.querySelectorAll('input[type="range"]');

  // Add event listeners to all range inputs
  rangeInputs.forEach((input) => {
    input.addEventListener("input", function () {
      // Update the displayed value
      const display = this.nextElementSibling;
      display.textContent = this.value;

      // Update the CSS variable
      const varName = "--" + this.id.replace(/([A-Z])/g, "-$1").toLowerCase();
      document.documentElement.style.setProperty(
        varName,
        this.id.includes("duration") || this.id.includes("blur")
          ? this.value + (this.id.includes("duration") ? "s" : "px")
          : this.value
      );
    });
  });

  // Initialize CSS variables with default values
  function initCssVariables() {
    // Animation duration
    document.documentElement.style.setProperty(
      "--animation-duration",
      iconConfig.animation.duration + "s"
    );

    // Initial shadow properties
    document.documentElement.style.setProperty(
      "--initial-shadow1-blur",
      iconConfig.shadow.initial.shadow1.blur + "px"
    );
    document.documentElement.style.setProperty(
      "--initial-shadow1-opacity",
      iconConfig.shadow.initial.shadow1.opacity
    );
    document.documentElement.style.setProperty(
      "--initial-shadow2-blur",
      iconConfig.shadow.initial.shadow2.blur + "px"
    );
    document.documentElement.style.setProperty(
      "--initial-shadow2-opacity",
      iconConfig.shadow.initial.shadow2.opacity
    );

    // Peak shadow properties
    document.documentElement.style.setProperty(
      "--peak-shadow1-blur",
      iconConfig.shadow.peak.shadow1.blur + "px"
    );
    document.documentElement.style.setProperty(
      "--peak-shadow1-opacity",
      iconConfig.shadow.peak.shadow1.opacity
    );
    document.documentElement.style.setProperty(
      "--peak-shadow2-blur",
      iconConfig.shadow.peak.shadow2.blur + "px"
    );
    document.documentElement.style.setProperty(
      "--peak-shadow2-opacity",
      iconConfig.shadow.peak.shadow2.opacity
    );
  }

  // Add collapsible functionality for sections
  const collapseButtons = document.querySelectorAll('.collapse-btn');
  collapseButtons.forEach(button => {
    button.addEventListener('click', function() {
      const content = this.parentElement.nextElementSibling;
      const isVisible = content.style.display !== 'none';
      
      content.style.display = isVisible ? 'none' : 'block';
      this.textContent = isVisible ? '+' : '-';
    });
  });

  // Call on page load
  initCssVariables();
});

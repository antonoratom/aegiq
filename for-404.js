document.addEventListener("DOMContentLoaded", () => {
  const aliveVideos = [
    "https://cdn.prod.website-files.com/6803a061bf062b16676ca7b5%2F686226b25073fe9d1d422bd1_%D0%A1at%20is%20alive%20-1-transcode.mp4",
    "https://cdn.prod.website-files.com/6803a061bf062b16676ca7b5%2F68622bd1c1b15cec763ee6ce_%D0%A1at%20is%20alive%20-2-transcode.mp4"
  ];

  const deadVideos = [
    "https://cdn.prod.website-files.com/6803a061bf062b16676ca7b5%2F68622be37cb0b3e1c33e8d06_%D0%A1at%20is%20dead%20-1-transcode.mp4",
    "https://cdn.prod.website-files.com/6803a061bf062b16676ca7b5%2F68622bed1822116e4113c574_%D0%A1at%20is%20dead%20-2-transcode.mp4"
  ];

  const dom = {
    container: document.getElementById("videoPlayer"),
    safeClose: document.querySelector("[safe-status='close']"),
    safeOpen: document.querySelector("[safe-status='open']"),
    catStatus: document.querySelector("[cat-status]"),
    aliveCounter: document.querySelector("[alive-number]"),
    deadCounter: document.querySelector("[dead-number]")
  };

  const state = {
    aliveCount: 0,
    deadCount: 0,
    currentVideo: { url: null, alive: null }
  };

  function getRandomVideo() {
    const combined = [
      ...aliveVideos.map(url => ({ url, alive: true })),
      ...deadVideos.map(url => ({ url, alive: false }))
    ];

    if (combined.length < 2) return combined[0];

    let random;
    do {
      random = combined[Math.floor(Math.random() * combined.length)];
    } while (state.currentVideo.url && random.url === state.currentVideo.url);

    return random;
  }

  function updateSafeStatus() {
    dom.safeClose?.style.setProperty("display", "none");
    dom.safeOpen?.style.setProperty("display", "flex");
  }

  function updateCatStatus() {
    if (!dom.catStatus) return;
    if (state.currentVideo.alive) {
      dom.catStatus.textContent = "alive";
      state.aliveCount++;
      dom.aliveCounter.textContent = state.aliveCount;
    } else {
      dom.catStatus.textContent = "dead";
      state.deadCount++;
      dom.deadCounter.textContent = state.deadCount;
    }
  }

  function loadVideo() {
    dom.container.replaceChildren();

    state.currentVideo = getRandomVideo();

    const video = document.createElement("video");
    video.src = state.currentVideo.url;
    video.controls = false;
    video.classList.add("game-video");

    video.addEventListener("click", () => {
      video.play();
      setTimeout(() => {
        updateSafeStatus();
        updateCatStatus();
      }, 400);
    }, { once: true });

    video.addEventListener("ended", () => {
      setTimeout(loadVideo, 1000);
    });

    dom.container.appendChild(video);
  }

  loadVideo();
});

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
//END SWIPER FOR FEEDBACKS ON HOME PAGE

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

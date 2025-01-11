import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

let swiperInstance;

export const initSwiper = () => {
  if (swiperInstance) swiperInstance.destroy();

  swiperInstance = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1440: {
        slidesPerView: 3,
      },
    },
  });
};

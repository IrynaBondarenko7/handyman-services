import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

export const gallerySwiper = () => {
  const swiper = new Swiper(".swiper", {
    speed: 3000,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });
};

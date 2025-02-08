import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

export const gallerySwiper = () => {
  const swiper = new Swiper(".swiper", {
    speed: 3000,
    loop: true,
    autoplay: false,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });

  let autoplayStarted = false;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !autoplayStarted) {
          swiper.autoplay.start();
          autoplayStarted = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const swiperContainer = document.querySelector(".swiper");
  if (swiperContainer) {
    observer.observe(swiperContainer);
  }
};

import { refs } from "./refs";
import { gallerySwiper } from "./gallerySwiper";
import { client } from "./contentfulConfig";

export function fetchAndAppendGalleryImagesFromCMS() {
  refs.gallerySwiperWrapper.innerHTML = `<p class='mx-auto text-main'>Loading gallery images...</p>`;

  client
    .getEntries({ content_type: "images", include: 2 })
    .then((response) => {
      refs.gallerySwiperWrapper.innerHTML = "";

      createSlideForEachImage(response);
    })
    .catch(() => {
      refs.gallerySwiperWrapper.innerHTML = `<p class="mx-auto text-main">Failed to load images. Please try again later.</p>`;
    });
}

function createSlideForEachImage(dataFromCMS) {
  dataFromCMS.includes.Asset.map((asset) =>
    createAndAppendGallerySlideHTML(asset.fields.file.url)
  );

  gallerySwiper();
}

function createAndAppendGallerySlideHTML(imageUrl) {
  const slide = document.createElement("div");
  slide.classList.add("swiper-slide", "bg-bgColor", "relative");

  slide.innerHTML = `<img
                  src="https:${imageUrl}"
                  alt="garden"
                  class="object-scale-down h-[350px] xl:h-[600px] mx-auto"
                />`;

  refs.gallerySwiperWrapper.appendChild(slide);
}

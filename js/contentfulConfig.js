import * as contentful from "contentful";

export const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  environment: "master",
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// export function contentFulCMS() {
//   refs.gallerySwiperWrapper.innerHTML = `<p class='mx-auto text-main'>Loading gallery images...</p>`;
//   client
//     .getEntries({ content_type: "images", include: 2 })
//     .then((response) => {
//       refs.gallerySwiperWrapper.innerHTML = "";
//       getGalleryImagesURL(response);
//     })
//     .catch(() => {
//       refs.gallerySwiperWrapper.innerHTML = `<p class="mx-auto text-main">Failed to load images. Please try again later.</p>`;
//     });
// }

// function getGalleryImagesURL(data) {
//   data.includes.Asset.map((asset) => {
//     console.log(`https:${asset.fields.file.url}`);

//     const slide = document.createElement("div");
//     slide.classList.add("swiper-slide", "bg-bgColor", "relative");
//     slide.innerHTML = `<img
//                   src="https:${asset.fields.file.url}"
//                   alt="garden"
//                   class="object-scale-down h-[350px] xl:h-[600px] mx-auto"
//                 />`;

//     refs.gallerySwiperWrapper.appendChild(slide);
//   });
//   gallerySwiper();
// }

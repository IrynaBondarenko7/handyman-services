import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { initSwiper } from "./reviewsSwiper.js";
import { db } from "./firebaseConfig.js";
import { refs } from "./refs.js";

export const fetchAndAppendReviews = async () => {
  refs.reviewsSwiperWrapper.innerHTML = "Loading reviews...";

  try {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      refs.reviewsSwiperWrapper.innerHTML = `<p class="no-reviews-text">No reviews yet. Be the first to leave one!</p>`;
      return;
    }

    refs.reviewsSwiperWrapper.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const review = doc.data();

      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      slide.innerHTML = reviewHTMLcode(review);

      refs.reviewsSwiperWrapper.appendChild(slide);
    });

    if (!refs.reviewsSwiperContainer.querySelector(".swiper-button-next")) {
      createSwiperButtons(refs.reviewsSwiperContainer, "swiper-button-next");
    }

    if (!refs.reviewsSwiperContainer.querySelector(".swiper-button-prev")) {
      createSwiperButtons(refs.reviewsSwiperContainer, "swiper-button-prev");
    }

    initSwiper();
  } catch (error) {
    refs.reviewsSwiperWrapper.innerHTML = `<p class="no-reviews-text">Failed to load reviews. Please try again later.</p>`;
  }
};

function reviewHTMLcode(reviewObj) {
  return `
  <div class="review-card">
            <div>
                <svg class="quotes-icon">
                     <use xlink:href="./images/icons/icons.svg#quotes-left"></use>
                </svg>
          </div>
                <p class="review-text">${reviewObj.review}</p>
                <div class="review-user-info-wrap">
                  <div>
                    <svg class="quotes-icon">
                     <use xlink:href="./images/icons/icons.svg#circle-user"></use>
                    </svg>
                  </div>
                  <div class="review-user-info">
                    <h3 class="review-name">${reviewObj.name}</h3>
                    <small class="review-date"
                      >${formatDate(reviewObj.createdAt.toDate())}</small
                    >
                  </div>
                </div>
              </div>
`;
}

const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

function createSwiperButtons(container, buttonsClassName) {
  const button = document.createElement("div");
  button.classList.add(buttonsClassName);
  container.appendChild(button);
}

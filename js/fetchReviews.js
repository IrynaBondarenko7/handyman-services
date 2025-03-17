import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { initSwiper } from "./reviewsSwiper.js";
import { db } from "./firebaseConfig.js";

export const fetchReviews = async () => {
  const swiperWrapper = document.getElementById("reviews-swiper");
  const swiperContainer = document.querySelector(".swiper-container");
  swiperWrapper.innerHTML = "Loading reviews...";

  try {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      swiperWrapper.innerHTML = `<p class="no-reviews-text">No reviews yet. Be the first to leave one!</p>`;
      return;
    }

    swiperWrapper.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const review = doc.data();

      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      slide.innerHTML = reviewHTMLcode(review);

      swiperWrapper.appendChild(slide);
    });

    if (!swiperContainer.querySelector(".swiper-button-next")) {
      const nextButton = document.createElement("div");
      nextButton.classList.add("swiper-button-next");
      swiperContainer.appendChild(nextButton);
    }

    if (!swiperContainer.querySelector(".swiper-button-prev")) {
      const prevButton = document.createElement("div");
      prevButton.classList.add("swiper-button-prev");
      swiperContainer.appendChild(prevButton);
    }

    initSwiper();
  } catch (error) {
    swiperWrapper.innerHTML = `<p class="no-reviews-text">Failed to load reviews. Please try again later.</p>`;
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

import { refs } from "./refs.js";

export const headerScrollPosition = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    refs.header.style.top = "0";
  } else {
    refs.header.style.top = "55px";
  }
};

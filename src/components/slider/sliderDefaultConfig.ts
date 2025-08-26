import { SwiperOptions } from "swiper/types";

export const configDefault: SwiperOptions = {
  spaceBetween: 10,
  slidesPerView: "auto",

  // autoplay: {
  //   delay: 500,
  //   disableOnInteraction: false,
  //   pauseOnMouseEnter: true,
  //   waitForTransition: true,
  // },
  speed: 2000,
  //loop: true,
  navigation: {
    prevEl: ".arrow-left",
    nextEl: ".arrow-right",
  },

  pagination: { clickable: true },
  scrollbar: { draggable: true },
  modules: [], //[Navigation, A11y, Autoplay]
  breakpoints: {
    // when window width is >= 640px
    480: {
      slidesPerView: "auto",
    },
    // when window width is >= 768px
    768: {
      slidesPerView: "auto",
    },
    1024: {
      slidesPerView: "auto",
    },
  },
};

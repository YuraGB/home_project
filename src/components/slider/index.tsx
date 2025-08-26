"use client";
import React, { ReactNode } from "react";
import { Swiper, SwiperProps } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";

import { A11y, Autoplay, Navigation } from "swiper/modules";
import { configDefault } from "@/components/slider/sliderDefaultConfig";

type Props = SwiperProps & {
  children: ReactNode;
};

export const Slider = (props: Props): ReactNode => {
  const modules = [Navigation, A11y, Autoplay];
  const configurations = {
    ...configDefault,
    modules,
    ...props,
  };
  return <Swiper {...configurations}>{props.children}</Swiper>;
};

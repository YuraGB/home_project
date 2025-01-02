"use client";
import React, { ReactNode } from "react";
import { Swiper, SwiperProps } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";

import { A11y, Autoplay, Navigation } from "swiper/modules";
import { configDefault } from "@/components/slider/sliderDefaultConfig";

type Props = {
  children: ReactNode[];
  config?: SwiperProps | NonNullable<unknown>;
};

export const Slider = ({ children, config = {} }: Props): ReactNode => {
  const modules = [Navigation, A11y, Autoplay];
  const configurations = {
    ...configDefault,
    modules,
    ...config,
  };
  return <Swiper {...configurations}>{children}</Swiper>;
};

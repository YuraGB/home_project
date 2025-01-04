import { useViewPort } from "@/hooks/useWindowSize";

export const useTextContent = () => {
  const viewPort = useViewPort();
  let positionTitleLogin = [15, 40, 10];
  let positionTextLogin = [15, 30, 10];
  let positionTitleRegistration = [-70, 40, 10];
  let positionTextRegistration = [-70, 30, 10];
  let sizeTitle = 5;
  let sizeText = 3;

  if (viewPort === "tablet") {
    positionTitleLogin = [-15, 40, 10];
    positionTextLogin = [-30, 30, 10];
    positionTextRegistration = [-30, 30, 10];
    positionTitleRegistration = [-30, 40, 10];
  }
  if (viewPort === "mobile") {
    positionTitleLogin = [-17, 40, 10];
    positionTextLogin = [-17, 30, 10];
    positionTextRegistration = [-17, 30, 10];
    positionTitleRegistration = [-17, 40, 10];
    sizeText = 2;
    sizeTitle = 4;
  }
  return {
    positionTitleLogin,
    positionTextLogin,
    positionTitleRegistration,
    positionTextRegistration,
    sizeText,
    sizeTitle,
  };
};

import { useViewPort } from "@/hooks/useWindowSize";

export const useTextContent = () => {
  const viewPort = useViewPort();
  let positionTitleLogin = [15, 25, 10];
  let positionTextLogin = [15, 15, 10];
  let positionTitleRegistration = [-70, 25, 10];
  let positionTextRegistration = [-70, 15, 10];
  let sizeTitle = 5;
  let sizeText = 3;

  if (viewPort === "tablet") {
    positionTitleLogin = [-15, 40, 10];
    positionTextLogin = [-30, 30, 10];
    positionTextRegistration = [-30, 30, 10];
    positionTitleRegistration = [-30, 40, 10];
  }
  if (viewPort === "mobile") {
    positionTitleLogin = [-17, 30, 10];
    positionTextLogin = [-17, 20, 10];
    positionTextRegistration = [-17, 20, 10];
    positionTitleRegistration = [-17, 30, 10];
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

import { ReactNode } from "react";
import { TopRatedIcon } from "./categoryIcons/TopRated";
import { EducationIcon } from "./categoryIcons/EducationIcon";

export const CategoryIcon = ({
  categoryIconName,
  classes,
}: {
  categoryIconName?: string | null;
  classes?: string;
}): ReactNode => {
  switch (categoryIconName) {
    case "topRated":
      return (
        <TopRatedIcon
          className={`size-8 text-current ${classes ? classes : ""}`}
        />
      );
    case "education":
      return (
        <EducationIcon
          className={`size-8 text-current ${classes ? classes : ""}`}
        />
      );
    default:
      return null;
  }
};

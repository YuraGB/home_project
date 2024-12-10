import React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
  },
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-yellow-200",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalstars?: number;
  size?: number;
  fill?: boolean;
  icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
  cb?: (rData: number) => void;
}

const Ratings = ({ ...props }: RatingsProps) => {
  const {
    rating,
    totalstars = 5,
    size = 20,
    fill = true,
    icon = <Star />,
    variant = "default",
    cb = () => {},
    ...rest
  } = props;
  const partial = rating % 1 > 0;
  const fullStars = Math.floor(rating);

  const partialStar = partial ? (
    <PartialStar
      fillPercentage={rating % 1}
      size={size}
      className={cn(ratingVariants[variant].star)}
      icon={icon}
      callback={() => cb(fullStars + 1)}
    />
  ) : null;

  return (
    <div className={cn("flex items-center gap-2 cursor-pointer")} {...rest}>
      {[...Array(fullStars)].map((_, i) =>
        React.cloneElement(icon, {
          key: i,
          size,
          className: cn(
            fill ? "fill-current" : "fill-transparent",
            ratingVariants[variant].star,
          ),
          onClick: () => cb(i + 1),
        }),
      )}
      {partialStar}
      {[...Array(totalstars - fullStars - (partialStar ? 1 : 0))].map((_, i) =>
        React.cloneElement(icon, {
          key: i + fullStars + 1,
          size,
          className: cn(ratingVariants[variant].emptyStar),
          onClick: () =>
            partial ? cb(i + fullStars + 2) : cb(i + fullStars + 1),
        }),
      )}
    </div>
  );
};

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
  icon: React.ReactElement;
  callback: () => void;
}
const PartialStar = ({ ...props }: PartialStarProps) => {
  const { fillPercentage, size, className, icon, callback = () => {} } = props;

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onClick={() => callback()}
    >
      {React.cloneElement(icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  );
};

export { Ratings };

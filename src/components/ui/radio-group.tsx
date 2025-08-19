"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import { cn } from "@/server/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={
        props.children
          ? className
          : cn(
              "border-input text-primary relative focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )
      }
      {...props}
    >
      {props.children ? (
        <span className="relative  w-fit flex items-center justify-center">
          {props.children}
          <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator">
            <div className="absolute w-full h-full bg-slate-500 top-0 left-0 z-[-1]" />
          </RadioGroupPrimitive.Indicator>
        </span>
      ) : (
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="relative flex items-center justify-center"
        >
          <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
        </RadioGroupPrimitive.Indicator>
      )}
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };

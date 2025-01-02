import { useState } from "react";

export const useActionBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerHandler = () => setIsOpen((state) => !state);

  return {
    isOpen,
    triggerHandler,
  };
};

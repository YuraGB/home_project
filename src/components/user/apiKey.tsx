import { ReactNode } from "react";
import { Button } from "../ui/button";
import { useApiKey } from "./hooks/useApiKey";

/**
 * ApiKey component to display or generate an API key.
 *
 * @param {Object} props - The component props.
 * @param {string | null} props.apiKey - The API key to display, if available.
 * @param {string | null} props.email - The user's email, required for generating an API key.
 * @returns {ReactNode} The rendered component.
 */
export const ApiKey = ({
  apiKey,
  email,
}: {
  apiKey?: string | null;
  email: string | null;
}): ReactNode => {
  const { createApiKey, isPending, handleClick } = useApiKey();

  if (!email) return null;

  if (apiKey) {
    return (
      <Button
        variant="ghost"
        onClick={() => handleClick(apiKey)}
        disabled={isPending}
        className="w-full"
      >
        <p className="truncate"> {apiKey}</p>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={() => createApiKey(email)}
      disabled={isPending}
    >
      Generate an ap key
    </Button>
  );
};

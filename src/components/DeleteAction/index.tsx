import { Button } from "@/components/ui/button";
import { FormattedMessage } from "react-intl";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  disabled: boolean;
  onClickAction: () => void;
  onCloseAction: Dispatch<SetStateAction<boolean>>;
};
export const DeleteAction = ({
  onCloseAction,
  disabled,
  onClickAction,
}: TProps) => {
  return (
    <section className={"flex w-full p-4 justify-between gap-4"}>
      <Button
        variant={"default"}
        onClick={() => onCloseAction(false)}
        className={"w-full"}
      >
        <FormattedMessage id={"cancel"} defaultMessage={"Cancel"} />
      </Button>
      <Button
        className={"w-full"}
        variant={"destructive"}
        disabled={disabled}
        onClick={onClickAction}
      >
        <FormattedMessage id={"delete"} defaultMessage={"Delete"} />
      </Button>
    </section>
  );
};

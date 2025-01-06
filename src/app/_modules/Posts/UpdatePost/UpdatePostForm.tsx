import { Dispatch, ReactNode, SetStateAction } from "react";
import { CreateUpdatePostForm } from "@/app/_modules/Posts/CreateUpdateForm";
import { Button } from "@/components/ui/button";
import { FormattedMessage } from "react-intl";
import { TPostWithRating } from "@/lib/formatPostData";
import { useUpdatePost } from "@/app/_modules/Posts/hooks/useUpdatePost";

export type TPropsUpdateForm = {
  post: TPostWithRating;
  onCloseAction: Dispatch<SetStateAction<boolean>>;
};

export const UpdatePostForm = (props: TPropsUpdateForm): ReactNode => {
  const { onSubmit, form, loadingUpdatePost } = useUpdatePost(props);

  return (
    <CreateUpdatePostForm form={form} onSubmitAction={onSubmit}>
      <Button type="submit" disabled={loadingUpdatePost}>
        {loadingUpdatePost ? (
          <FormattedMessage id={"savingPost"} defaultMessage={"Saving"} />
        ) : (
          <FormattedMessage id={"savePost"} defaultMessage={"Save new post"} />
        )}
      </Button>
    </CreateUpdatePostForm>
  );
};

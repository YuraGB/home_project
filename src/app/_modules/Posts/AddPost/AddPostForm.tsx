import { useAddPost } from "@/app/_modules/Posts/hooks/useAddPost";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { TPropsAddForm } from "@/app/[locale]/[categoryId]/_modules/components/types";
import { CreateUpdateForm } from "@/app/_modules/Posts/CreateUpdateForm";

export const AddPostForm = (props: TPropsAddForm): ReactNode => {
  const { onSubmit, form, loadingNewPost } = useAddPost(props);

  return (
    <CreateUpdateForm form={form} onSubmitAction={onSubmit}>
      <Button type="submit" disabled={loadingNewPost}>
        {loadingNewPost ? (
          <FormattedMessage id={"savingPost"} defaultMessage={"Saving"} />
        ) : (
          <FormattedMessage id={"savePost"} defaultMessage={"Save new post"} />
        )}
      </Button>
    </CreateUpdateForm>
  );
};

"use client";
import { useAddPost } from "@/app/_modules/Posts/hooks/useAddPost";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { TPropsAddForm } from "@/app/[locale]/categories/[categoryId]//_modules/components/types";
import { CreateUpdatePostForm } from "@/app/_modules/Posts/CreateUpdateForm";

export const AddPostForm = (props: TPropsAddForm): ReactNode => {
  const { onSubmit, form, loadingNewPost } = useAddPost(props);

  return (
    <CreateUpdatePostForm form={form} onSubmitAction={onSubmit}>
      <Button type="submit" disabled={loadingNewPost}>
        {loadingNewPost ? (
          <FormattedMessage id={"savingPost"} defaultMessage={"Saving"} />
        ) : (
          <FormattedMessage id={"savePost"} defaultMessage={"Save new post"} />
        )}
      </Button>
    </CreateUpdatePostForm>
  );
};

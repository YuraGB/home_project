"use client";
import { useAddPost } from "@/modules/post/hooks/useAddPost";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";

import { CreateUpdatePostForm } from "@/modules/post/CreateUpdateForm";
import { AddImage } from "../AddImage";
import { TPropsAddForm } from "@/modules/subCategory/components/types";

export const AddPostForm = (props: TPropsAddForm): ReactNode => {
  const {
    onSubmit,
    form,
    loadingNewPost,
    onBlurTitleAction,
    imagesArray,
    imageExist,
    loadingImages,
    setImage,
  } = useAddPost(props);
  return (
    <CreateUpdatePostForm
      form={form}
      onSubmitAction={onSubmit}
      onBlurTitleAction={onBlurTitleAction}
    >
      <AddImage
        listImages={imagesArray}
        loadingImages={loadingImages}
        setImage={setImage}
        imageExist={imageExist}
      />

      <Button type='submit' disabled={loadingNewPost}>
        {loadingNewPost ? (
          <FormattedMessage id={"savingPost"} defaultMessage={"Saving"} />
        ) : (
          <FormattedMessage id={"savePost"} defaultMessage={"Save new post"} />
        )}
      </Button>
    </CreateUpdatePostForm>
  );
};

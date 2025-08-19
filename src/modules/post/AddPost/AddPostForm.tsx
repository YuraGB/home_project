"use client";
import { useAddPost } from "@/modules/post/hooks/useAddPost";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";

import { CreateUpdatePostForm } from "@/modules/post/CreateUpdateForm";
import { AddImage } from "./AddImage";
import { TPropsAddForm } from "@/modules/subCategory/components/types";
import { AddImageButton } from "./AddImageButton";

export const AddPostForm = (props: TPropsAddForm): ReactNode => {
  const {
    onSubmit,
    form,
    loadingNewPost,
    imagesArray,
    imageExist,
    loadingImages,
    setImage,
    showAddImageButton,
    loadImageAction,
  } = useAddPost(props);
  return (
    <>
      <section className="text-center mb-4">
        {showAddImageButton ? (
          <AddImageButton loadAction={loadImageAction} />
        ) : null}

        <AddImage
          listImages={imagesArray}
          loadingImages={loadingImages}
          setImage={setImage}
          imageExist={imageExist}
        />
      </section>

      <CreateUpdatePostForm form={form} onSubmitAction={onSubmit}>
        <Button type="submit" disabled={loadingNewPost}>
          {loadingNewPost ? (
            <FormattedMessage id={"savingPost"} defaultMessage={"Saving"} />
          ) : (
            <FormattedMessage
              id={"savePost"}
              defaultMessage={"Save new post"}
            />
          )}
        </Button>
      </CreateUpdatePostForm>
    </>
  );
};

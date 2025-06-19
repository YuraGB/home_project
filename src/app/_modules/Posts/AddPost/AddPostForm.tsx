"use client";
import { useAddPost } from "@/app/_modules/Posts/hooks/useAddPost";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { TPropsAddForm } from "@/app/[locale]/categories/[categoryId]//_modules/components/types";
import { CreateUpdatePostForm } from "@/app/_modules/Posts/CreateUpdateForm";
import { AddImage } from "../AddImage";
import { LoaderCircle } from "lucide-react";

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
      {loadingImages ? (
        <section className="absolute w-[calc(50%-30px)] h-[calc(100%-50px)] overflow-hidden bg-gray-100 left-0 top-10 flex flex-col mx-[15px] items-center">
          <h3 className="font-bold w-full pt-6 px-2">
            <FormattedMessage
              id={"loadingImages"}
              defaultMessage={"Loading images..."}
            />
          </h3>
          <LoaderCircle className={"animate-spin"} />
        </section>
      ) : null}
      {imagesArray ? (
        <AddImage
          listImages={imagesArray}
          setImage={setImage}
          imageExist={imageExist}
        />
      ) : null}
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

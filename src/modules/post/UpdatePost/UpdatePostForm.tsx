import { Dispatch, ReactNode, SetStateAction } from 'react';
import { CreateUpdatePostForm } from '@/modules/post/CreateUpdateForm';
import { Button } from '@/components/ui/button';
import { FormattedMessage } from 'react-intl';
import { TPostWithRating } from '@/server/lib/formatPostData';
import { useUpdatePost } from '@/modules/post/hooks/useUpdatePost';
import { AddImage } from '../AddPost/AddImage';

export type TPropsUpdateForm = {
  post: TPostWithRating;
  onCloseAction: Dispatch<SetStateAction<boolean>>;
};

export const UpdatePostForm = (props: TPropsUpdateForm): ReactNode => {
  const {
    onSubmit,
    form,
    loadingUpdatePost,
    imageExist,
    imagesArray,
    loadingImages,
    onBlurTitleAction,
    setImage,
  } = useUpdatePost(props);

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

      <Button type="submit" disabled={loadingUpdatePost}>
        {loadingUpdatePost ? (
          <FormattedMessage id={'savingPost'} defaultMessage={'Saving'} />
        ) : (
          <FormattedMessage
            id={'updatePost'}
            defaultMessage={'Update the post'}
          />
        )}
      </Button>
    </CreateUpdatePostForm>
  );
};

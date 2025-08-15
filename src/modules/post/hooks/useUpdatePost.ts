'use client';
import {
  NewPost,
  useNewPostValidationSchema as useUpdatePostValidationSchema,
} from '@/modules/post/hooks/schema/validationSchemaAddPost';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TPropsUpdateForm } from '@/modules/post/UpdatePost/UpdatePostForm';
import { useMutationApi } from '@/hooks/apiCalls/mutation';
import { updatePostData } from '@/server/controllers/post/postService';
import { TDBPost } from '@/db/drizzle/schemas/postsSchema';
import { TUpdatePostData } from '@/server/controllers/post/types';
import { useIntl } from 'react-intl';
import { useAddImage } from './useAddImage';

export const useUpdatePost = ({ post, onCloseAction }: TPropsUpdateForm) => {
  const { toast } = useToast();
  const { locale } = useIntl();

  const {
    isPending: loadingUpdatePost,
    error: errorUpdatePost,
    data: updatedPost,
    mutate: updatePostAction,
  } = useMutationApi<
    TUpdatePostData & { locale: string },
    TDBPost | null | undefined
  >(updatePostData);

  const formSchema = useUpdatePostValidationSchema();
  const form = useForm<NewPost>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: post.name ?? '',
      description: post.description ?? '',
      url: post.url ?? '',
      image: post.image ?? '',
      rating: !!post.rate,
    },
  });

  const setImage = (imgUrl: string) => form.setValue('image', imgUrl);
  const imageExist = form.watch('image');

  const { imagesArray, loadingImages } = useAddImage();

  useEffect(() => {
    if (errorUpdatePost) {
      //todo translation
      toast({
        variant: 'destructive',
        title: 'Post not updated',
        description: 'There was a problem with updating the post.',
      });
    }
  }, [errorUpdatePost, toast]);

  useEffect(() => {
    if (!!updatedPost) {
      onCloseAction(false);
    }
  }, [onCloseAction, updatedPost]);

  const onSubmit = (values: NewPost) => {
    if (post.id) {
      updatePostAction({
        ...post,
        ...values,
        locale,
      });
    }
  };

  return {
    loadingUpdatePost,
    onSubmit,
    form,
    imagesArray,
    imageExist,
    loadingImages,
    setImage,
  };
};

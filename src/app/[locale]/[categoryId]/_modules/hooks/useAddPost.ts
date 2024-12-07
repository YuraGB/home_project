import {
  NewPost,
  useNewPostValidationSchema,
} from "@/app/[locale]/[categoryId]/_modules/hooks/schema/validationSchemaAddPost";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAddPostApi } from "@/app/[locale]/[categoryId]/_modules/apiCalls/useAddPostApi";
import { TPropsAddForm } from "@/app/[locale]/[categoryId]/_modules/components/types";

export const useAddPost = ({ categoryId, userId, onClose }: TPropsAddForm) => {
  const { toast } = useToast();
  const { newPost, loadingNewPost, createPost, errorCreateNewPost } =
    useAddPostApi();
  const formSchema = useNewPostValidationSchema();
  const form = useForm<NewPost>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      image: "",
      rating: false,
    },
  });
  const ratingWatch = form.watch("rating");
  useEffect(() => {}, [ratingWatch]);

  useEffect(() => {
    if (errorCreateNewPost) {
      //todo translation
      toast({
        variant: "destructive",
        title: "New post not created",
        description: "There was a problem with creating new post.",
      });
    }
  }, [errorCreateNewPost, toast]);

  useEffect(() => {
    if (!!newPost) {
      onClose();
    }
  }, [onClose, newPost]);

  const onSubmit = (values: NewPost) =>
    createPost({
      userId,
      categoryId,
      ...values,
    });

  return {
    loadingNewPost,
    onSubmit,
    form,
  };
};

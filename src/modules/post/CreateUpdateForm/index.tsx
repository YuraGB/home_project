import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormattedMessage } from "react-intl";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { ReactNode } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { NewPost } from "@/modules/post/hooks/schema/validationSchemaAddPost";

type TProps = {
  children: ReactNode;
  form: UseFormReturn<NewPost>;
  onSubmitAction: SubmitHandler<NewPost>;
};

export const CreateUpdatePostForm = ({
  children,
  form,
  onSubmitAction,
}: TProps): ReactNode => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitAction)}
        className="w-full space-y-2"
      >
        <FormField
          defaultValue={""}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>
                <FormattedMessage
                  defaultMessage={"Name of the post"}
                  id={"namePost"}
                />
              </FormLabel>
              <FormControl>
                <Input
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={""}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>
                <FormattedMessage
                  defaultMessage={"The description of the post"}
                  id={"postDescription"}
                />
              </FormLabel>
              <FormControl>
                <Input
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={""}
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>
                <FormattedMessage
                  defaultMessage={"The url of the post"}
                  id={"postUrl"}
                />
              </FormLabel>
              <FormControl>
                <Input
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={""}
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>
                <FormattedMessage
                  defaultMessage={"The image of the post"}
                  id={"postImage"}
                />
              </FormLabel>
              <FormControl>
                <Input
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          defaultValue={false}
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-2 leading-none inline pl-2">
                <FormLabel>
                  <FormattedMessage
                    id={"titleRatingCheckbox"}
                    defaultMessage={"Rating"}
                  />
                </FormLabel>
                <FormDescription>
                  <FormattedMessage
                    id={"ratingDescription"}
                    defaultMessage={"The rating will be shown with the post"}
                  />
                </FormDescription>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {children}
      </form>
    </Form>
  );
};

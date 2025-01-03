"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormattedMessage } from "react-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddCategoryForm } from "@/app/[locale]/_modules/hooks/useAddCategoryForm";
import { ReactNode } from "react";

export const AddCategoryForm = ({
  userId,
  onCloseAction,
}: {
  userId: number;
  onCloseAction: () => void;
}): ReactNode => {
  const { onSubmit, form, loadingNewCategory } = useAddCategoryForm(
    userId,
    onCloseAction,
  );
  return (
    <Form
      control={form.control}
      formState={form.formState}
      reset={form.reset}
      handleSubmit={form.handleSubmit}
      getFieldState={form.getFieldState}
      resetField={form.resetField}
      clearErrors={form.clearErrors}
      setError={form.setError}
      getValues={form.getValues}
      setValue={form.setValue}
      register={form.register}
      setFocus={form.setFocus}
      trigger={form.trigger}
      watch={form.watch}
      unregister={form.unregister}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-2">
        <FormField
          defaultValue={""}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <FormattedMessage
                  defaultMessage={"Name of the category"}
                  id={"name"}
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
              <FormLabel>
                <FormattedMessage
                  defaultMessage={"Description"}
                  id={"description"}
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
        <br />
        <Button
          type="submit"
          disabled={loadingNewCategory}
          className={"w-full"}
        >
          {loadingNewCategory ? (
            <FormattedMessage id={"savingCategory"} defaultMessage={"Saving"} />
          ) : (
            <FormattedMessage
              id={"saveCategory"}
              defaultMessage={"Save new category"}
            />
          )}
        </Button>
      </form>
    </Form>
  );
};

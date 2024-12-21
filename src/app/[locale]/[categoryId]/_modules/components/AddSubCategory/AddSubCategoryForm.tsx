import { ReactNode } from "react";
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
import { TPropsAddForm } from "@/app/[locale]/[categoryId]/_modules/components/types";
import { useAddSubCategory } from "@/app/[locale]/[categoryId]/_modules/hooks/useAddSubCategory";

export const AddSubCategoryForm = (props: TPropsAddForm): ReactNode => {
  const { onSubmit, form, loadingNewSubCategory } = useAddSubCategory(props);

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
              <FormLabel aria-required={true}>
                <FormattedMessage
                  defaultMessage={"The name of the sub category"}
                  id={"nameSubCategory"}
                />
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  required={true}
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
                  defaultMessage={"The description of the subCategory"}
                  id={"subCategoryDescription"}
                />
                <span className="text-red-500">*</span>
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
              <FormLabel>
                <FormattedMessage
                  defaultMessage={"The image of the sub category"}
                  id={"subCategoryImage"}
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

        <Button type="submit" disabled={loadingNewSubCategory}>
          {loadingNewSubCategory ? (
            <FormattedMessage
              id={"savingSubCategory"}
              defaultMessage={"Saving"}
            />
          ) : (
            <FormattedMessage
              id={"saveSubCategory"}
              defaultMessage={"Save new sub category"}
            />
          )}
        </Button>
      </form>
    </Form>
  );
};

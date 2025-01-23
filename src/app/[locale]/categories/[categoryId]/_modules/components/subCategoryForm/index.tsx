import { ReactNode } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { NewSubCategory } from "@/app/[locale]/categories/[categoryId]/_modules/hooks/schema/validationSchemaAddSubCategoryt";

type TProps = {
  children: ReactNode;
  form: UseFormReturn<NewSubCategory>;
  onSubmitAction: SubmitHandler<NewSubCategory>;
};

export const SubCategoryForm = ({
  form,
  onSubmitAction,
  children,
}: TProps): ReactNode => {
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
      <form
        onSubmit={form.handleSubmit(onSubmitAction)}
        className="w-1/2 space-y-2"
      >
        <FormField
          defaultValue={""}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true} aria-required={true}>
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
              <FormLabel isRequired={true}>
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
        <FormField
          control={form.control}
          name="layoutSchema"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>
                <FormattedMessage
                  defaultMessage={"Layout schema"}
                  id={"layoutSchema"}
                />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a layout for displaying posts" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="default">
                    <FormattedMessage
                      id={"defaultPostLayout"}
                      defaultMessage={"The default layout"}
                    />{" "}
                  </SelectItem>
                  <SelectItem value="topRate">
                    <FormattedMessage
                      id={"topRatePostLayout"}
                      defaultMessage={"The top rate layout"}
                    />
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                <FormattedMessage
                  defaultMessage={
                    "The posts will will be shown in the specific layout"
                  }
                  id={"layoutSchemaDescription"}
                />
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {children}
      </form>
    </Form>
  );
};

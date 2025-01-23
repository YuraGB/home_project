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
import { ReactNode } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { NewCategory } from "@/app/[locale]/_modules/hooks/schema/useAddCategorySchema";

type TProps = {
  children: ReactNode;
  form: UseFormReturn<NewCategory>;
  onSubmitAction: SubmitHandler<NewCategory>;
};

export const CreateUpdateCategoryForm = ({
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
              <FormLabel isRequired={true}>
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
              <FormLabel isRequired={true}>
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
        {children}
      </form>
    </Form>
  );
};

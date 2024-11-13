"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginFormHook } from "@/app/[locale]/(auth)/login/_modules/login_form/hooks/loginFormHook";
import { FormattedMessage } from "react-intl";

export function InputForm() {
  const { form, onSubmit } = useLoginFormHook();

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          defaultValue={""}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <FormattedMessage defaultMessage={"E-mail"} id={"email"} />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={""}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <FormattedMessage defaultMessage={"Password"} id={"password"} />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default InputForm;

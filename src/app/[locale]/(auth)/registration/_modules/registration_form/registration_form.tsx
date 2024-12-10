"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useRegistrationForm } from "@/app/[locale]/(auth)/registration/_modules/registration_form/hooks/registrationFormHook";
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
import { LogInIcon } from "lucide-react";
import { LinkWithLocale } from "@/components/linkWithLocale/LinkWithLocale";

const RegistrationForm = (): ReactNode => {
  const { form, onSubmit } = useRegistrationForm();
  return (
    <article className={"grid grid-cols-2 w-full"}>
      <motion.div
        className={"w-full col-start-2 pl-14 relative"}
        initial={{
          opacity: 0,
          x: 100,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
      >
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
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              defaultValue={""}
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormattedMessage
                      defaultMessage={"User name"}
                      id={"username"}
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
                      className={"md:text-xl md:h-12"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input
                      name={field.name}
                      ref={field.ref}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      className={"md:text-xl md:h-12"}
                    />
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
                    <FormattedMessage
                      defaultMessage={"Password"}
                      id={"password"}
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
                      className={"md:text-xl md:h-12"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={"w-full"}>
              Registration
            </Button>
          </form>
        </Form>
        <LinkWithLocale
          href={"login"}
          className={
            "absolute top-1/2 left-[-60px] transform -translate-y-1/2 p-4 border-[1px] rounded-[50%] border-[--foreground]"
          }
        >
          <LogInIcon />
          <span className={"hidden"}>login</span>
        </LinkWithLocale>
      </motion.div>
    </article>
  );
};

export default RegistrationForm;

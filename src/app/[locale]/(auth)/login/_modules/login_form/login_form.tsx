"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
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
import { LinkWithLocale } from "@/components/linkWithLocale/LinkWithLocale";

export function LoginForm() {
  const { form, onSubmit } = useLoginFormHook();

  return (
    <article className={"grid grid-cols-2 w-full "}>
      <motion.div
        className={"w-full relative justify-items-end pr-14"}
        initial={{
          x: -100,
          opacity: 0,
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"leading-5"}>
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
              Login in
            </Button>
          </form>
        </Form>
        <LinkWithLocale
          href={"registration"}
          className={
            "absolute top-1/2 right-[-60px] transform -translate-y-1/2 p-4 border-[1px] rounded-[50%] border-[--foreground]"
          }
        >
          <UserPlus />
          <span className={"hidden"}>registration</span>
        </LinkWithLocale>
      </motion.div>
    </article>
  );
}

export default LoginForm;

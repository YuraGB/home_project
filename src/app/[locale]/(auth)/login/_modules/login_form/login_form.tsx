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
  const { formState } = form;

  return (
    <article
      className={
        "grid grid-cols-1 lg:grid-cols-2 w-full grid-rows-[100px,1fr] lg:grid-rows-1"
      }
    >
      <motion.div
        className={
          "w-full row-start-2 relative justify-items-center lg:justify-items-end lg:pr-14"
        }
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
            {formState.errors.root?.serverError && (
              <FormMessage className={"text-destructive"}>
                {formState.errors.root.serverError.message}
              </FormMessage>
            )}
            <Button type="submit" className={"w-full"}>
              Login in
            </Button>
          </form>
        </Form>
        <LinkWithLocale
          href={"registration"}
          aria-label={"registration link"}
          className={
            "absolute top-[-100px] right-[100%] lg:top-1/2 lg:right-[-60px] lg:transform lg:-translate-y-1/2 p-4 pl-5 pb-5 border rounded-[50%]"
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

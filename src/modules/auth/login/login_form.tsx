"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LoaderCircle, UserPlus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormattedMessage } from "react-intl";
import { LinkWithLocale } from "@/components/linkWithLocale/LinkWithLocale";
import { useLoginFormHook } from "./hooks/loginFormHook";

export function LoginForm() {
  const { form, onSubmit, loading, gettingUser } = useLoginFormHook();
  const { formState } = form;

  return (
    <article
      className={`grid lg:grid-cols-2 w-full grid-rows-[100px,1fr] grid-rows-1`}
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`w-full sm:w-2/3 space-y-6  ${gettingUser ? "disabled-form" : ""}`}
          >
            <FormField
              defaultValue={""}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired={true} className={"leading-5"}>
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
                  <FormLabel isRequired={true}>
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
            <Button
              type="submit"
              className={"w-full"}
              disabled={loading.current}
            >
              {loading.current ? (
                <LoaderCircle className={"animate-spin"} />
              ) : (
                "Login in"
              )}
            </Button>
          </form>
        </Form>
        <LinkWithLocale
          href={"registration"}
          aria-label={"registration link"}
          prefetch={true}
          className={
            "absolute top-[-100px] lg:right-[-60px] lg:top-1/2 lg:transform lg:-translate-y-1/2 p-4 pl-5 pb-5 border rounded-[50%]"
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

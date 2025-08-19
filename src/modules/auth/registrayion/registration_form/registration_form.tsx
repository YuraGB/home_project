"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
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
import { LoaderCircle, LogInIcon } from "lucide-react";
import { LinkWithLocale } from "@/components/linkWithLocale/LinkWithLocale";
import { useRegistrationForm } from "./hooks/registrationFormHook";

const RegistrationForm = (): ReactNode => {
  const { form, onSubmit, loading } = useRegistrationForm();
  return (
    <article
      className={
        "grid grid-cols-1 lg:grid-cols-2 w-full grid-rows-[100px,1fr] lg:grid-rows-1"
      }
    >
      <motion.div
        className={
          "w-full row-start-2 justify-items-center lg:justify-items-start lg:col-start-2 lg:pl-14 relative"
        }
        initial={{
          opacity: 0,
          x: 100,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
      >
        <Form {...form}>
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
                  <FormLabel isRequired={true}>
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
                  <FormLabel isRequired={true}>
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
            <Button type="submit" className={"w-full"}>
              {loading.current ? (
                <LoaderCircle className={"animate-spin"} />
              ) : (
                "Create new user"
              )}
            </Button>
          </form>
        </Form>
        <LinkWithLocale
          href={"login"}
          aria-label={"login link"}
          className={
            "absolute top-[-100px] left-0 lg:top-1/2 lg:left-[-60px] lg:transform lg:-translate-y-1/2 p-4 pr-5 pb-5 border rounded-[50%]"
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

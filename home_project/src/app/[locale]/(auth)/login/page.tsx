import LoginForm from "@/app/[locale]/(auth)/login/_modules/login_form/login_form";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";

export default function Login() {
  return (
    <DefaultPageLayout>
      <LoginForm />
    </DefaultPageLayout>
  );
}

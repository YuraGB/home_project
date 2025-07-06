import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";
import LoginForm from "@/modules/auth/login/login_form";

export default function Login() {
  return (
    <DefaultPageLayout>
      <LoginForm />
    </DefaultPageLayout>
  );
}

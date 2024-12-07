import RegistrationForm from "@/app/[locale]/(auth)/registration/_modules/registration_form/registration_form";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";

export default function Registration() {
  return (
    <DefaultPageLayout>
      <RegistrationForm />
    </DefaultPageLayout>
  );
}

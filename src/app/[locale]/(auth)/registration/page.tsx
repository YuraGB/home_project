import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";
import RegistrationForm from "@/modules/auth/registrayion/registration_form/registration_form";

export default function Registration() {
  return (
    <DefaultPageLayout>
      <RegistrationForm />
    </DefaultPageLayout>
  );
}

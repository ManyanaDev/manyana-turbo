import { ReactNode } from "react";
import RegistrationLayout from "../../../../components/layouts/RegistrationLayout";

export default function Wrapper({ children }: { children: ReactNode }) {
  return <RegistrationLayout>{children}</RegistrationLayout>;
}

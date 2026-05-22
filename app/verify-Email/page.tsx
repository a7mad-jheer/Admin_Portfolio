import { Suspense } from "react";
import VerifyEmailClient from "../Components/verifyComponent/VerifyEmailClient";

export default function CheckEmailPage() {



  return (
    <Suspense fallback={<>Loading ...</>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
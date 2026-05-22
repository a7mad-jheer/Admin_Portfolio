"use client";

import Link from "next/link";
import { useToast } from "@/hook/ui/useToast";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import ToastError from "@/app/(Admin)/components/Error/ToastError";

export const VerigyEmailClient = () => {

  const { message, show } = useToast();
  const { loading, status, fail, success } = useReqStatus();

  const searchEmail = useSearchParams();

  const email = searchEmail.get("email");



  const resendEmail = async () => {
    if (!email) {
        console.log(email)
      show("No email found. Please login again.");
      return;
    }

    loading();

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    });

    if (error) {
      show(error.message);
      fail();
      return;
    }

    show("Confirmation email sent!");
    success();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      
      {message && <ToastError message={message} />}

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-md">

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">
          Check your email 📩
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          We’ve sent you a confirmation link. Please verify your account to continue.
        </p>

        <p className="text-gray-400 text-sm mb-4">
            Please check your inbox — and don’t forget to look in your spam/junk folder just in case.
        </p>

        {/* Email display */}
        <div className="text-sm text-gray-300 mb-4">
          {email ? (
            <>
              Sent to: <span className="text-white">{email}</span>
            </>
          ) : (
            "Loading email..."
          )}
        </div>

        {/* Resend button */}
        <button
          onClick={resendEmail}
          disabled={status.loading || !email}
          className="w-full mt-3 bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {status.loading ? "Sending..." : "Resend email"}
        </button>

        {/* Back to login */}
        <div className="mt-6">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white">
            Back to login
          </Link>
        </div>

        {/* Hint */}
        <p className="text-xs text-gray-600 mt-4">
          Didn’t receive it? Check your spam folder.
        </p>
      </div>
    </div>
  );
}

export default VerigyEmailClient;
"use client";

import { useInsertData } from "@/hook/api/useInsertData";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useState } from "react";
import ToastError from "../../Error/ToastError";
import { useToast } from "@/hook/ui/useToast";

type Profile = {
  id: number;
  name: string;
  user_name: string;
  user_id: string;
};

type props = {
  user_id: string;
  profile: Profile;
};

export const FeedbackSubmit = ({ user_id, profile }: props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const { insertData } = useInsertData();
  const { status, loading, fail, success } = useReqStatus();
  const { show, message } = useToast();

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status.loading) return;

    loading();

    const { error } = await insertData("feedback", {
      text: inputValue,
      user_id: user_id,
      user_name: profile.user_name,
    });

    if (error) {
      console.log("Somthing went wrong when insert data", error);
      show("Somting went Wrong! , please try again");
      fail();
      return;
    }

    success();
    show(`Thanks ${profile.user_name} for your feedback!`);
    setInputValue("");
  };
  return (
    <form className="my-5" onSubmit={handleSubmitFeedback}>
      {message && <ToastError message={message} />}

      <h1 className="mb-2">Share your experience.</h1>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none "
        placeholder="Tell us what you liked or what can be improved..."
      />

      <button className="bg-[#005f3c] border border-gray-700 cursor-pointer hover:scale-102 font-bold py-2 px-4 rounded-md mt-3">
        {status.loading ? "submitting" : "Submit"} Feedback
      </button>
    </form>
  );
};

export default FeedbackSubmit;

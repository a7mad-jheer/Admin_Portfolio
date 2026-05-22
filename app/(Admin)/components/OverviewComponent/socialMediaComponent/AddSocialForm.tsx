"use client";

import { FaSquareGithub } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useUpsertData } from "@/hook/api/useUpsertData";
import { socialMediaSchema } from "@/Schema/authSchema";
import {  useState } from "react";
import z from "zod";
import { IconType } from "react-icons";
import ErrorSchema from "../../Error/ErrorSchema";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import ToastError from "../../Error/ToastError";

type socialKeys = "Gmail" | "Facebook" | "Whatsapp" | "Github" | "LinkedIn";

type socialInfer = z.infer<typeof socialMediaSchema>;

const socialMedia_obj: { id: number; name: socialKeys; icon: IconType }[] = [
  { id: 0, name: "Gmail", icon: MdMarkEmailUnread },
  { id: 1, name: "Facebook", icon: FaFacebookSquare },
  { id: 2, name: "Whatsapp", icon: FaSquareWhatsapp },
  { id: 3, name: "Github", icon: FaSquareGithub },
  { id: 4, name: "LinkedIn", icon: FaLinkedin },
];

type socialMediaType = {
  id: number | null;
  user_id: string;
  Gmail: string;
  Facebook: string;
  Whatsapp: string;
  Github: string;
  LinkedIn: string;
};

type props = {
  user_id: string;
  onUpdate ?: (data: socialMediaType) => void;
};



export const AddSocialForm = ({ user_id, onUpdate }: props) => {
  const [errorSchema, setErrorSchema] = useState<Record<string, string>>({});
  const [socialMedia, setSocialMedia] = useState<socialInfer>({
    Gmail: "",
    Facebook: "",
    Whatsapp: "",
    Github: "",
    LinkedIn: "",
  });
  /*api operation */
  const { upsertData } = useUpsertData();
  const { status, loading, fail, success } = useReqStatus();
  const { show, message } = useToast();
  /*api operation */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.loading) return;

    loading();

    const result = socialMediaSchema.safeParse(socialMedia);
    if (!result.success) {
      console.log(result.error.issues);
      const fieldError: typeof errorSchema = {};
      result.error.issues.forEach((err) => {
        fieldError[err.path[0] as string] = err.message;
      });

      setErrorSchema(fieldError);
      fail();
      return;
    }

    setErrorSchema({});

    const cleanData = Object.entries(socialMedia).filter(
      ([_, value]) => value !== "",
    );
    const cleanObject = Object.fromEntries(cleanData);

    const { data, error } = await upsertData("social", cleanObject, user_id);

    if (error) {
      if (error.code === "23505") {
        fail();
        show("This social media link is already in use.");
      } else {
        console.log("there is error when insert data", error);
        fail();
        show("Something went wrong while adding the item.");
      }
      return;
    }

    console.log(data);

    if(!data){
      console.log("somthing went wrongg when updated data !" , data);
      fail();
      show("Something went wrong! , please try again")
      return
    }

    if(onUpdate) {
      onUpdate({
      id: data.id,
      Gmail: data.Gmail,
      Facebook: data.Facebook,
      Whatsapp: data.Whatsapp,
      Github: data.Github,
      LinkedIn: data.LinkedIn,
      user_id: data.user_id,
    });
    }
    

    success();
    setSocialMedia({
      Gmail: "",
      Facebook: "",
      Whatsapp: "",
      Github: "",
      LinkedIn: "",
    });
    show("Data sent successfully.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSocialMedia((prev) => ({ ...prev, [name]: value }));
  };

  return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full">
      {message && <ToastError message={message} />}

      {socialMedia_obj.map((inp) => {
        return (
          <div key={inp.id} className="flex flex-col gap-2 ">
            {errorSchema[inp.name] && (
              <ErrorSchema errorSchema={errorSchema[inp.name]} />
            )}
            <label className="flex gap-2">
              <input
                value={socialMedia[inp.name]}
                onChange={(e) => handleChange(e)}
                name={inp.name}
                type="text"
                placeholder={`Enter Your ${inp.name} Url...`}
                className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
              />
              <span>
                <inp.icon size={45} />
              </span>
            </label>
          </div>
        );
      })}

      <button
        type="submit"
        className="mt-auto transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700 w-full p-2  rounded-md "
      >
        {status.loading ? "saving..." : "Save"}
      </button>
    </form>
  );
};

export default AddSocialForm;

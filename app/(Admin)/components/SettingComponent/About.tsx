"use client";
import z from "zod";
import { aboutSchema } from "@/Schema/authSchema";
import { useEffect, useState } from "react";
import ErrorSchema from "../Error/ErrorSchema";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import { useUpsertData } from "@/hook/api/useUpsertData";
import ToastError from "../Error/ToastError";

type aboutKeys = "about" | "experience" | "goals";

const aboutObj: { id: number; name: aboutKeys; placeholder: string }[] = [
  {
    id: 0,
    name: "about",
    placeholder: "Tell us about yourself, your passion, and what you do...",
  },
  {
    id: 1,
    name: "experience",
    placeholder: "Describe your skills, technologies, and experience...",
  },
  {
    id: 2,
    name: "goals",
    placeholder:
      "Share your goals and what you aim to achieve in your career...",
  },
];
type aboutDataType = {
  id: number | null;
  about: string;
  experience: string;
  goals: string;
  user_id: string | null;
};

type aboutInfer = z.infer<typeof aboutSchema>;

type props = {
  user_id: string;
  onUpdate?: (data: aboutDataType) => void;
};

export const About = ({ user_id, onUpdate }: props) => {
  const [aboutList, setAboutList] = useState<aboutInfer>({
    about: "",
    experience: "",
    goals: "",
  });
  const [errorSchema, setErrorSchema] = useState<Record<string, string>>({});

  /* api operation */
  const { upsertData } = useUpsertData();
  const { status, loading, success, fail } = useReqStatus();
  const { show, message } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setAboutList((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(aboutList);
  }, [aboutList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status.loading) return;
    loading();

    const result = aboutSchema.safeParse(aboutList);
    if (!result.success) {
      const fieldError: typeof errorSchema = {};
      result.error.issues.forEach((err) => {
        fieldError[err.path[0] as string] = err.message;
      });

      setErrorSchema(fieldError);
      fail();
      return;
    }

    setErrorSchema({});

    const clearObject = Object.fromEntries(
      Object.entries(aboutList).filter(([_, value]) => value !== ""),
    );

    const { data, error } = await upsertData("about", clearObject, user_id);
    if (error) {
      if (error.code === "23505") {
        fail();
        show("This information already exists.");
      } else {
        console.log("there is error when insert data", error);
        fail();
        show("Something went wrong while saving your data.");
      }
      return;
    }

    success();
    if (onUpdate) {
      onUpdate({
        id: data.id,
        about: data.about,
        experience: data.experience,
        goals: data.goals,
        user_id: data.user_id,
      });
    }
    show("Data updated successfully.");
    setAboutList({
      about: "",
      experience: "",
      goals: "",
    });
  };

  return (
    <div className="text-center bg-zinc-900 p-2 rounded-md h-full my-5 flex flex-col">
      {message && <ToastError message={message} />}
      <h1 className="p-2 text-2xl font-semibold mb-10 border-b-2 border-gray-700">
        About Me
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
        {aboutObj.map((about) => {
          return (
            <div key={about.id}>
              {errorSchema[about.name] && (
                <ErrorSchema errorSchema={errorSchema[about.name]} />
              )}
              <textarea
                value={aboutList[about.name]}
                onChange={(e) => handleChange(e)}
                name={about.name}
                placeholder={about.placeholder}
                className="resize-none h-30 w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
              />
            </div>
          );
        })}

        <button
          type="submit"
          className="mt-auto transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700 w-full p-2  rounded-md"
        >
          {status.loading ? "saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default About;

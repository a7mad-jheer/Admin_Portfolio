"use client";

import { SetStateAction, useState } from "react";
import FormAction from "../../Global/FormAction";
import IconAction from "../../Global/IconAction";
import { aboutSchema } from "@/Schema/authSchema";
import z from "zod";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useUpdateData } from "@/hook/api/useUpdateData";
import { useToast } from "@/hook/ui/useToast";
import ErrorSchema from "../../Error/ErrorSchema";
import ToastError from "../../Error/ToastError";

type aboutKeys = "about" | "experience" | "goals";
type aboutDataType = {
  id: number | null;
  about: string;
  experience: string;
  goals: string;
  user_id: string | null;
};

type adboutInfer = z.infer<typeof aboutSchema>;

type props = {
  data: aboutDataType;
  onAdd: (data: string) => void;
  selectedItem: aboutKeys | "";
  setSelectedItem: React.Dispatch<SetStateAction<aboutKeys | "">>;
  setDeleteCliced: React.Dispatch<SetStateAction<boolean>>;
};

export const AboutCard = ({
  data,
  onAdd,
  selectedItem,
  setSelectedItem,
  setDeleteCliced,
}: props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [errorSchema, setErrorSchema] = useState<
    Partial<Record<keyof adboutInfer, string>>
  >({});

  /* api operations */
  const { success, fail, loading, status } = useReqStatus();
  const { updateData } = useUpdateData();
  const { show, message } = useToast();
  /* api operations */

  const capitalizeFirst = (text: string) => {
    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  /* handle Save New Edit Value */
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedItem) {
      console.log("Somthing Went Wrong! , in Selected Item" + selectedItem);
      show("Please select an item");
      return;
    }

    if (status.loading) return;

    const schemaValid = z.object({
      [selectedItem]: z
        .string()
        .min(20, `${selectedItem} is too short. Minimum 20 characters.`)
        .max(200, `${selectedItem} is too long. Maximum 200 characters.`),
    });

    const fieldValid = {
      [selectedItem]: inputValue,
    };

    const result = schemaValid.safeParse(fieldValid);
    if (!result.success) {
      const fieldError: typeof errorSchema = {};
      result.error.issues.forEach((err) => {
        fieldError[err.path[0] as keyof adboutInfer] = err.message;
      });
      setErrorSchema(fieldError);
      console.log(fieldError);
      fail();
      return;
    }

    setErrorSchema({});

    loading();

    const { error } = await updateData(
      "about",
      { [selectedItem]: inputValue },
      [{ column: "id", value: data.id }],
    );

    if (error) {
      console.log("there is error when update data", error);
      fail();
      show("Somting Went Wromg! , Please try again.");
      return;
    }

    success();
    show("Edit Successfully.");
    onAdd(inputValue);
    setSelectedItem("");
    setInputValue("");
  };

  const AboutInfo: { id: number; name: aboutKeys; value: string }[] = [
    {
      id: 0,
      name: "about",
      value: data.about,
    },
    {
      id: 1,
      name: "experience",
      value: data.experience,
    },
    {
      id: 2,
      name: "goals",
      value: data.goals,
    },
  ];

  return (
    <div className="border border-gray-800 bg-[hsl(0_0%_10.98%)]  w-full rounded-md mt-5 p-4">
      {message && <ToastError message={message} />}

      {AboutInfo.map((text) => {
        return (
          <div
            key={text.id}
            className=" relative bg-gradient-to-r from-gray-400/20 to-gray-600/20 p-4 rounded-md mt-5 space-y-2"
          >
            <h1 className="font-semibold ">{capitalizeFirst(text.name)}</h1>
            {selectedItem === text.name ? (
              <form onSubmit={handleSaveEdit} className="w-full">
                {errorSchema[text.name] && (
                  <ErrorSchema errorSchema={errorSchema[text.name]!} />
                )}
                <label className="flex items-center gap-2">
                  <textarea
                    disabled={status.loading}
                    name={text.name}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`Update Your ${selectedItem} Here...`}
                    className="w-full h-25 resize-none bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none flex-1"
                  />

                  <FormAction
                    onCancel={() => {
                      setSelectedItem("");
                      setInputValue("");
                      setErrorSchema({});
                    }}
                    status={status}
                    row={false}
                  />
                </label>
              </form>
            ) : (
              <div>
                <p className="text-xs text-gray-400 ml-3">
                  {text.value || "No data yet!"}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AboutCard;

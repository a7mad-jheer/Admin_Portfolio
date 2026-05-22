"use client";
import React, { useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import Image from "next/image";
import { ImCancelCircle } from "react-icons/im";
import { bioSchema } from "@/Schema/authSchema";
import z from "zod";
import { useUser } from "@/Context/UserInfoContext";
import ErrorSchema from "../Error/ErrorSchema";
import { useUpload } from "@/hook/api/useUpload";
import { useGetImageUrl } from "@/hook/api/useGetImageUrl";
import { useInsertData } from "@/hook/api/useInsertData";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";
import ToastError from "../Error/ToastError";

type bio_Type = {
  fullName: string;
  jobTitle: string;
  description: string;
  image: File | null;
};

type bio_Schema = z.infer<typeof bioSchema>;

export const Bio = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [bio, setBio] = useState<bio_Type>({
    fullName: "",
    jobTitle: "",
    description: "",
    image: null,
  });
  const [errorSchema, setErrorSchema] = useState<
    Partial<Record<keyof bio_Schema, string>>
  >({});
  const { userInfo } = useUser();

  /* api operation */
  const { uploadImage } = useUpload();
  const { getImageUrl } = useGetImageUrl();
  const { insertData } = useInsertData();
  const { status, loading, fail, success } = useReqStatus();
  const { show, message } = useToast();
  /******** api operation ********/

  /*image setting */

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files?.[0];
    if (!files) return;

    console.log(files);
    setImageFile(files);

    const url = URL.createObjectURL(files);
    setImageUrl(url);
  };

  const handleDrageOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length <= 0) return;

    const file = files[0];
    setImageFile(file);

    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  /* supabase */
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.loading) return;

    if (!imageFile) {
      console.log("imageFile theres value is null" + imageFile);
      return;
    }

    const bioSchemaObj = { ...bio, image: imageFile };
    const result = bioSchema.safeParse(bioSchemaObj);

    if (!result.success) {
      const fieldError: typeof errorSchema = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldError[err.path[0] as keyof bio_Schema] = err.message;
        }
      });

      setErrorSchema(fieldError);
      console.log(errorSchema);
      fail();
      return;
    }

    setErrorSchema({});

    if (!userInfo) {
      console.log("user_id is null");
      fail();
      return;
    }

    loading();

    const imageName = `${Date.now()}-${imageFile!.name}`;

    const { error: uploadError } = await uploadImage(
      "image",
      imageName,
      imageFile,
    );

    if (uploadError) {
      console.log("there is error when upload image");
      fail();
      show("Failed to load image. Please try again.");
      return;
    }
    const { data: storageData } = await getImageUrl("image", imageName);

    const imageStorageUrl = storageData.publicUrl;

    const { error: bioError } = await insertData("bio", {
      full_name: bio.fullName,
      job_title: bio.jobTitle,
      description: bio.description,
      image: imageStorageUrl,
      user_id: userInfo.user_id,
    });

    if (bioError) {
      console.log("there is error when insert data => ", bioError);
      fail();
      show("Failed to update bio. Please try again.")
      return;
    }

    success();
    show("Bio updated successfully.");
    setBio({
      fullName: "",
      jobTitle: "",
      description: "",
      image: null,
    });
    setImageFile(null);
    setImageUrl(null);
  };

  return (
    <div className="h-full">

    {message && (
      <ToastError message={message}/>
    )}

      <form
        onSubmit={handleOnSubmit}
        className="text-center my-5 bg-zinc-900 p-2 rounded-md h-full flex flex-col gap-5"
      >
        <h1 className="p-2 text-2xl font-semibold mb-10 border-b-2 border-gray-700">
          Profile Setting
        </h1>

        {errorSchema.image && <ErrorSchema errorSchema={errorSchema.image} />}
        {imageUrl ? (
          <div className="relative w-full h-50 border border-gray-500 overflow-hidden mb-5 ">
            <Image
              src={imageUrl}
              alt="there is problem in your Image"
              fill
              className="object-cover"
            />
            <span
              onClick={() => setImageUrl(null)}
              className="absolute top-1 right-1 text-red-600 bg-white rounded-full text-3xl cursor-pointer"
            >
              <ImCancelCircle />
            </span>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={handleDrageOver}
            onDrop={handleDrop}
            className="bg-[hsl(0_0%_10.98%)] w-full h-50 border border-dashed border-gray-500 flex flex-col justify-center items-center shadow-2xl rounded-md mb-3"
          >
            <span className="">
              <CiCamera size={60} />
            </span>
            <h1 className="text-xl font-semibold">Drag & Drop Profile Image</h1>
            <input
              hidden
              onChange={handleAddImage}
              accept="image/*"
              ref={inputRef}
              type="file"
              className="w-full h-full "
            />
          </div>
        )}
        {errorSchema.fullName && (
          <ErrorSchema errorSchema={errorSchema.fullName} />
        )}
        <input
          value={bio.fullName}
          onChange={(e) =>
            setBio((prev) => ({ ...prev, fullName: e.target.value }))
          }
          type="text"
          placeholder="Full name (e.g., Ahmed Abdallah Jheer)"
          className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
        />
        {errorSchema.jobTitle && (
          <ErrorSchema errorSchema={errorSchema.jobTitle} />
        )}
        <input
          value={bio.jobTitle}
          onChange={(e) =>
            setBio((prev) => ({ ...prev, jobTitle: e.target.value }))
          }
          type="text"
          placeholder="Job title (e.g., Frontend Developer)"
          className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
        />
        {errorSchema.description && (
          <ErrorSchema errorSchema={errorSchema.description} />
        )}
        <textarea
          value={bio.description}
          onChange={(e) =>
            setBio((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Write a short description about yourself..."
          className="resize-none h-30 w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
        />

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
export default Bio;

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { IoCameraReverseOutline } from "react-icons/io5";
import ErrorSchema from "../Error/ErrorSchema";

  type props = {
    imageUrl : string | null,
    onAddImageFile : (data : File | null) => void,
    errorSchema : Record<string , string>
  }

export const AddImage = ({imageUrl , onAddImageFile , errorSchema} : props) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  /* OnDrop ,  */
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length <= 0) return;

    const file = files[0];
    setImageFile(file);

    const preview = URL.createObjectURL(file);
    setPreview(preview);
  };

  /*on Drage Over */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  /* Delete Image */
  const deleteImage = () => {
    setImageFile(null);
    setPreview(null);

  };

  useEffect(() => {
    setPreview(imageUrl)
  } , [imageUrl])

  /*  GET IMAGE AND URL */
  const handelAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files?.[0];
    if (!files) return;

    console.log(files);
    setImageFile(files);
    
    
    const previewUrl = URL.createObjectURL(files);
    setPreview(previewUrl);
  };

  useEffect(() => {
    onAddImageFile(imageFile)
    console.log("there is image file from add image =>" + imageFile?.name)
  },[imageFile])

  /* URL REVOKE TO CLEAR MEMORY */
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (

    <div>
      {errorSchema["image"] && (
            <ErrorSchema errorSchema={errorSchema["image"]} />
          )}

    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleOnDrop}
      onDragOver={(e) => handleDragOver(e)}
      className="border border-dashed w-full h-64 flex justify-center items-center relative cursor-pointer mb-5 mt-2"
    >
      {preview ? (
        <div>
          <Image src={`${preview}`} alt="" fill className="bg-cover" />
          <span
            onClick={deleteImage}
            className="absolute top-2 right-2  border-3 border-white bg-red-900 hover:bg-red-700 text-white rounded-md cursor-pointer"
          >
            <MdClose />
          </span>
        </div>
      ) : (
        <div className="">
          <input
            hidden
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handelAddImage}
            onDrop={handleOnDrop}
          />
          <div className="flex flex-col items-center">
            <IoCameraReverseOutline size={100} className="" />
            <p className="text-xl font-semibold ">Drag & Drop Project Image</p>
          </div>
        </div>
      )}
      {/*End Add Image*/}
    </div>
    </div>
  );
};

export default AddImage;

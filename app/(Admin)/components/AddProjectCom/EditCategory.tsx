"use client";

import { SetStateAction, useState } from "react";
import { MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import { DeleteCategory } from "./EditProjectComponent/DeleteCategory";
import EditCategoryForm from "./EditProjectComponent/EditCategoryForm";

type Category = {
  id: number | null;
  name: string;
  user_id: string;
};

type Category_Type = {
  categories: Category[];
  setCategories: React.Dispatch<SetStateAction<Category[]>>;
  onSelected: (
    id: number | null,
    name: string | null,
    user_id: string | null,
  ) => void;
  categorySelected: {
    id: number | null;
    name: string | null;
    user_id: string | null;
  };
};

export const EditCategory = ({
  categories,
  setCategories,
  onSelected,
  categorySelected,
}: Category_Type) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const [deleteClick, setDeleteClick] = useState<boolean>(false);
  const [editSelectedValue, setEditSelectedValue] = useState<number | null>(null);


  const deleteCategory = (id: number | null) => {
    const newCategory = categories.filter((cat) => cat.id !== id);
    setCategories(newCategory);
  };

  const updateCategory = (id: number | null, name: string) => {
    const newCategories = categories.map((cat) => {
      if (cat.id === id) {
        return { ...cat, name: name };
      } else return cat;
    });

    console.log(newCategories);
    setCategories(newCategories);
  };

  return (
    <div className=" mr-right w-full ">
      <div className=" my-2  w-full border-gray-200">
        <div
          onClick={() => setDropDown((prev) => !prev)}
          className=" bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border  mt-2  flex  justify-between  items-center "
        >
          <span className="font-bold">
            {categorySelected.name !== null
              ? categorySelected.name
              : "Select Category"}
          </span>
          <span
            className={`transfor duration-300 ${dropDown ? "rotate-x-180" : "rotate-x-0"}`}
          >
            <MdKeyboardArrowDown />
          </span>
        </div>

        <div className="bg-white flex flex-col w-full ">
          {dropDown && (
            <div>
              {categories.map((cat) => {
                return (
                  <div className="" key={cat.id}>
                    {editClicked && cat.id === editSelectedValue ? (
                      <EditCategoryForm
                        editSelectedValue={editSelectedValue}
                        setEditClicked={setEditClicked}
                        updateCategory={(id, name) => updateCategory(id, name)}
                      />
                    ) : (
                      <div className=" flex justify-between p-2 bg-[hsl(0_0%_10.98%)]  border-gray-800 border ">
                        
                        <span
                          onClick={() =>
                            onSelected(cat.id, cat.name, cat.user_id)
                          }
                          className="text-sm  flex-1"
                        >
                          {cat.name}
                        </span>

                        <div className="flex items-center gap-2 text-xl ">
                          <span
                            onClick={() => {
                              setEditClicked((prev) => !prev);
                              setEditSelectedValue(cat.id);
                            }}
                            className="text-blue-600 hover:text-blue-700 cursor-pointer"
                          >
                            <MdEdit />
                          </span>
                          <span
                            onClick={() => {
                              setEditSelectedValue(cat.id);
                              setDeleteClick((prev) => !prev);
                            }}
                            className="text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            <MdDelete />
                          </span>

                          <div>
                            {deleteClick && editSelectedValue === cat.id && (
                              <DeleteCategory
                                editSelectedValue={editSelectedValue}
                                setDeleteClick={setDeleteClick}
                                setEditSelectedValue={setEditSelectedValue}
                                deleteCategory={(id) => deleteCategory(id)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

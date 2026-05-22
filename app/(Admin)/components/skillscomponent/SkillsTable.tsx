"use client";

import { useState } from "react";
import { ConfirmDelete } from "../Global/ConfirmDelete";
import ToastError from "../Error/ToastError";
import { useDeleteData } from "@/hook/api/useDeleteData";
import { useUpdateData } from "@/hook/api/useUpdateData";
import { useReqStatus } from "@/hook/ui/useReqStatus";
import { useToast } from "@/hook/ui/useToast";

type skillsList = {
  id: number;
  name: string;
  user_id: string;
};

type props = {
  skillsList: skillsList[];
  onDelete: (deleteData: skillsList) => void;
  onEdit: (editData: skillsList) => void;
  supabaseTableTitle: string;
  user_id : string
};

export const SkillsTable = ({
  skillsList,
  onDelete,
  onEdit,
  supabaseTableTitle,
  user_id
}: props) => {
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [selectedBtn, setSelectedBtn] = useState<number | null>(null);
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>("");

  /* api operation */
  const { deleteData } = useDeleteData();
  const { updateData } = useUpdateData();
  const { status, loading, fail, success } = useReqStatus();
  const { show, message } = useToast();
  /* api operation */

  const handleConfirmDelete = async () => {
    if (status.loading) return;

    if(!selectedBtn) {
      console.log("there is no selectedBtn");
      return;
    }

    loading();

    const { data, error } = await deleteData(
      supabaseTableTitle,
      [
        { column: "id", value: selectedBtn },
        { column: "user_id", value: user_id },
      ],
      true,
    );

    if (error) {
      console.log("there is error when delete ****** skills Table");
      fail();
      show("Something went wrong. Please try again.");
      return;
    }

    success();
    show("Deleted successfully.");
    onDelete(data);
    console.log(data);
    setDeleteClicked(false);
    setSelectedBtn(null);
  };

  const handleEditSkills = async () => {
    if (status.loading) return;

    loading();

    const { data, error } = await updateData(
      supabaseTableTitle,
      { "name": newValue },
      [
        { column: "user_id", value: user_id },
        { column: "id", value: selectedBtn },
      ],
      true,
    );
    if (error) {
      console.log("there is error when Edit Technology =>" , error);
      fail();
      show("Something went wrong. Please try again.");
      return;
    }

    console.log(data);
    onEdit(data);
    success();
    show("Updated Successfully.");
    setNewValue("");
    setEditClicked(false);
  };

  return (
    <div >
      <ConfirmDelete
        status={status}
        showDelete={deleteClicked}
        selectedBtn={selectedBtn}
        title="project"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteClicked(false);
          setSelectedBtn(null);
        }}
      />

      {message && <ToastError message={message} />}

      <table className="text-white bg-[hsl(0_0%_10.98%)] border-gray-800 border p-2 border-collapse w-full mt-5 rounded-md">
        <thead>
          <tr>
            <th className="border border-gray-800  p-2">#</th>
            <th className="border border-gray-800  p-2">{supabaseTableTitle}</th>
            <th className="border border-gray-800  p-2">Options</th>
          </tr>
        </thead>

        <tbody>
          {skillsList &&
            skillsList.map((skill, index) => {
              return (
                <tr key={skill.id}>
                  <td className="border border-gray-800  p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-800  p-2 font-semibold">
                    {editClicked && selectedBtn === skill.id ? (
                      <input
                        required
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        type="text"
                        placeholder="Enter New Technology..."
                        className="w-full bg-[hsl(0_0%_10.98%)] p-2 border-gray-800 border rounded-md text-sm outline-none"
                      />
                    ) : (
                      <span>{skill.name} </span>
                    )}
                  </td>
                  <td className="border border-gray-800  p-2  max-w-30 ">
                    {editClicked && selectedBtn === skill.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={handleEditSkills}
                          className="transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700  p-2  rounded-md cursor-pointer w-1/2"
                        >
                          {status.loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          className="bg-red-800/50 py-2 px-3 rounded-md hover:bg-red-700 font-semibold cursor-pointer w-1/2"
                          onClick={() => {
                            setSelectedBtn(skill.id);
                            setEditClicked(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2 ">
                        <button
                          onClick={() => {
                            setEditClicked(true);
                            setSelectedBtn(skill.id);
                            setNewValue(skill.name)
                          }}
                          className="transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700  p-2  rounded-md cursor-pointer w-1/2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBtn(skill.id);
                            setDeleteClicked(true);
                            setNewValue("")
                          }}
                          className="bg-red-800/50 py-2 px-3 rounded-md hover:bg-red-700 font-semibold cursor-pointer w-1/2"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SkillsTable;

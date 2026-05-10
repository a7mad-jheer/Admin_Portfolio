"use client";
import { useEffect, useState } from "react";
import TitlePanel from "../Global/TitlePanel";
import SkillsTable from "./SkillsTable";
import AddSkillsForm from "./AddSkillsForm";


type Tools_Type = {
  id: number;
  name: string;
  user_id: string;
};

type props = {
  serverTools : Tools_Type[],
  user_id : string;
}

export const Tools = ({serverTools , user_id} : props) => {
  const [toolsList, setToolsList] = useState<Tools_Type[]>(serverTools);


  const handleAddTools = (addedData: Tools_Type | null) => {
    if(!addedData)return;
    setToolsList((prev) => [...prev, addedData]);
  };

  const handleDeletedTools = (deletedData: Tools_Type | null) => {
    if(!deletedData)return;
    const fiterDeleted = toolsList.filter((tech) => tech.id !== deletedData.id);
    setToolsList(fiterDeleted);
  };

  const handleEditTools = (editData: Tools_Type | null) => {
    if(!editData) return;

    const newTooolsArray = toolsList.map((tool) => {
      if (tool.id === editData.id) {
        return { ...tool, name: editData.name };
      } else return tool;
    });

    setToolsList(newTooolsArray);
  };

  useEffect(() => {
    console.log(toolsList);
  }, [toolsList]);

  return (
    <div className=" relative p-4 ">

      <div className="">
        <TitlePanel title="Add Tools" />

        <div className="bg-zinc-900 p-2 text-white mt-3">
          <p className="text-xl mb-2 font-semibold text-gray-300 ">Add Tools</p>

          <AddSkillsForm
            supabaseTableTitle="tools"
            onAdd={(eddedData) => handleAddTools(eddedData)}
            user_id = {user_id}
          />
        </div>

        <div className="bg-zinc-900">
          <h1 className="text-gray-300 my-3 text-xl font-semibold  p-2">
          All Tools
        </h1>

        <SkillsTable
          user_id ={user_id}
          supabaseTableTitle="tools"
          onEdit={(editData) => handleEditTools(editData)}
          onDelete={(deletedData) => handleDeletedTools(deletedData)}
          skillsList={toolsList}
        />
        </div>
      </div>
    </div>
  );
};

export default Tools;

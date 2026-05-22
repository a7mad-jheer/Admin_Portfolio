
import { Dispatch } from "react";
import { FaPlus } from "react-icons/fa";
import SkillsTable from "../../skillscomponent/SkillsTable";
import AddSkillsForm from "../../skillscomponent/AddSkillsForm";

type skillsType = {
  id: number;
  name: string;
  user_id: string;
};

type skillsSelectedKey = "tools" | "technologies" | "alone";

type props = {
  serverData: skillsType[];
  user_id: string;
  showEdit: boolean;
  setShowEdit: Dispatch<React.SetStateAction<boolean>>;
  skillsSelected: skillsSelectedKey;
  setSkillsSelected: Dispatch<React.SetStateAction<skillsSelectedKey>>;
  skillName : skillsSelectedKey,
  onDelete: (deletedData: skillsType) => void;
  onEdit: (editedData: skillsType) => void;
  onAdd: (addedData: skillsType) => void;
};

export const ToolsPreview = ({
  serverData,
  user_id,
  showEdit,
  setShowEdit,
  skillsSelected,
  setSkillsSelected,
  skillName,
  onAdd,
  onDelete,
  onEdit,
}: props) => {



  return (
    <div className="w-full h-full">

        <div className="flex items-center gap-5 mt-5 ">
          {showEdit && skillsSelected === skillName ? (
            <AddSkillsForm
              user_id={user_id}
              supabaseTableTitle={skillsSelected}
              onAdd={(addedData) => {
                console.log(addedData);
                onAdd(addedData)
              }}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
            />
          ) : (
            <>
              <h1 className="text-xl  font-semibold">{skillName} Information</h1>
              <span
                onClick={() => {
                  setShowEdit(true);
                  setSkillsSelected(skillName);
                }}
                className="text-white/70 bg-black/40 h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer "
              >
                <FaPlus />
              </span>
            </>
          )}
        </div>
      

      <SkillsTable
        skillsList={serverData}
        onDelete={(data) => onDelete(data)}
        onEdit={(data) => onEdit(data)}
        supabaseTableTitle={skillName}
        user_id={user_id}
      />
    </div>
  );
};

export default ToolsPreview;

import { Dispatch } from "react";
import SkillsTable from "../../skillscomponent/SkillsTable";
import { FaPlus } from "react-icons/fa";
import AddSkillsForm from "../../skillscomponent/AddSkillsForm";

type skillsType = {
  id: number;
  name: string;
  user_id: string;
};

type skillsSelectedKey = "tools" | "technologies" | "alone";

type props = {
  technologies: skillsType[];
  user_id: string;
  showEdit: boolean;
  setShowEdit: Dispatch<React.SetStateAction<boolean>>;
  skillsSelected: skillsSelectedKey;
  setSkillsSelected: Dispatch<React.SetStateAction<skillsSelectedKey>>;
  onDelete: (data: skillsType) => void;
  onEdit: (data: skillsType) => void;
  onAdd: (data: skillsType) => void;
};

export const TechnologiesPreview = ({
  technologies,
  user_id,
  showEdit,
  setShowEdit,
  skillsSelected,
  setSkillsSelected,
  onDelete,
  onEdit,
  onAdd,
}: props) => {
  return (
    <div>
      {technologies.length <= 0 ? (
        <div className="flex items-center gap-5 mt-5 ">
          {showEdit && skillsSelected === "technologies" ? (
            <AddSkillsForm
              user_id={user_id}
              supabaseTableTitle="technologies"
              onAdd={(data) => onAdd(data)}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
            />
          ) : (
            <>
              <h1 className="text-xl  font-semibold">Tools Information</h1>
              <span
                onClick={() => {setShowEdit(true); setSkillsSelected("technologies")}}
                className="text-white/70 bg-black/40 h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer "
              >
                <FaPlus />
              </span>
            </>
          )}
        </div>
      ) : (
        <h1 className="text-xl  font-semibold">Technologies Information</h1>
      )}

      <SkillsTable
        skillsList={technologies}
        onDelete={(data) => onDelete(data)}
        onEdit={(data) => onEdit(data)}
        supabaseTableTitle="technologies"
        user_id={user_id}
      />
    </div>
  );
};

export default TechnologiesPreview;

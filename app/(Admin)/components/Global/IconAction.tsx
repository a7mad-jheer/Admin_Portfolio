import { MdDelete, MdEdit } from "react-icons/md";

type props = {
    onEditClick : () => void;
    onDeleteClick : () => void;
    noAbsolute ?: boolean;
}

export const IconAction = ({onEditClick , onDeleteClick , noAbsolute = false} : props) => {
  return (
    <div className={`${noAbsolute ? "" : "absolute right-1 top-2"}  flex  gap-2`}>
      <span
        onClick={onEditClick}
        className="text-white/70 bg-black/40 h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer "
      >
        <MdEdit />
      </span>

      <span 
        onClick = {onDeleteClick}
        className="text-white/70 bg-black/30 h-9 w-9 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer">
        <MdDelete />
      </span>
    </div>
  );
};

export default IconAction;

import { IconType } from "react-icons";

export const AdminBtn = ({Icon , title , textColor , bgColor  ,type , onClick } : {Icon ?:IconType , title:string , textColor: string , bgColor:string  , type ?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]  , onClick?: () => void }) => {
    return (
        <button className={`${textColor} ${bgColor} flex items-center justify-center gap-1  rounded-md  p-2 shadow-2xl cursor-pointer text-center`}
            type = {type}
            onClick={onClick}
        >
         {Icon && (
            <span>{<Icon size={25}/>}</span>
         )}
            <span className="text-md font-semibold">{title}</span>
        </button>
    )
}

export default AdminBtn;
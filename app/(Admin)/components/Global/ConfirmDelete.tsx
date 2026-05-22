type statusType = {
  success : boolean,
  error : boolean,
  loading : boolean,

}

type props = {
    onConfirm : () => void,
    onCancel : () => void,
    title : string;
    showDelete : boolean;
    selectedBtn ?:number | string | null ;
    status : statusType
}

export const ConfirmDelete = ({onConfirm , onCancel  , title , showDelete , selectedBtn , status} : props) => {

  return (
    <>
      {showDelete && selectedBtn ? (
        <div className="">
      <div className="transform fixed z-50  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white  py-5 rounded-xl w-[80%] sm:w-96">
        <h1 className="text-xl font-semibold py-2 mb-3  text-center text-gray-300">Confirm deletion of {title}</h1>

        <div className="">
          <p className="px-4 text-sm mb-4 font-semibold border-y border-gray-900 py-4 text-gray-400">Are you sure you want to delete the selected {title}? This action cannot be undone.</p>

        <div className="flex items-center gap-2 px-4 ">
          <button  
            onClick={onConfirm}
            className="bg-red-800/50 py-2 px-3 rounded-md hover:bg-red-700 font-semibold cursor-pointer w-1/2"
          >{status.loading ? "Deleting..." : "Delete Now"}</button>
          <button 
            onClick={onCancel}
            className="bg-white/20 py-2 px-2 rounded-md hover:bg-gray-600 font-semibold cursor-pointer w-1/2">Cancel</button>
        </div>
        </div>
      </div>
      <div className="fixed z-40 top-0 left-0 bg-black/50 w-full h-screen backdrop-blur-md"></div>
    </div>
      ): ""}
    </>
  );
};

export default ConfirmDelete;

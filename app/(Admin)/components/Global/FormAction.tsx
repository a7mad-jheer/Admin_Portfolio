"use client"

type props = {
    onCancel : () => void ,
    status : {
      loading : boolean,
      error : boolean,
      success : boolean
    }
    row:boolean
}



export const FormAction = ({onCancel , status , row} : props) => {
    return (
        <div className={`flex ${row ? "flex-row": "flex-col"} gap-2 justify-end mt-5 text-sm `}>
                <button
                  type="submit"
                  className="transfom duration-200 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] border border-gray-700 p-2  rounded-md"
                >
                  {status.loading ? "saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={onCancel}
                  className="transfom duration-200 bg-[hsl(0_0%_15.98%)] hover:bg-[hsl(0_0%_20.98%)] border border-gray-700 p-2 rounded-md shadow-2xl "
                >
                  Cancel
                </button>
              </div>
    )
}

export default FormAction;
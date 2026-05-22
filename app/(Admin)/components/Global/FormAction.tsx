"use client"

import { useEffect } from "react"

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
  
useEffect(() => {
  console.log(status.loading , "status from form action")
}, [status.loading])

    return (
        <div className={`flex ${row ? "flex-row": "flex-col"} gap-2 justify-end text-white text-sm `}>
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
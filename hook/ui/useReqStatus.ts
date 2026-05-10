import { useState } from "react"

export const useReqStatus = () => {
    const [status , setStatus] = useState({
        success : false ,
        error : false,
        loading : false
    })


    const loading = () => setStatus({loading : true , error : false , success : false});
    const success = () => setStatus({loading : false , error : false , success : true});
    const fail = () => setStatus({loading : false, error : true , success : false});    
    return {status , loading , success , fail };
} 
import { useState } from "react"

export const useToast = () => {
    const [message , setMessage] = useState<string | null>(null);

    const show = (mesg : string | null) => {
        setMessage(mesg);
        
        setTimeout(() => setMessage(null) , 3000);
    } 

    return {show , message};
}
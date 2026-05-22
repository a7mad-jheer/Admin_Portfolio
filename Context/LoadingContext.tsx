"use client";

import { createContext, useState , Dispatch, SetStateAction } from "react";

type loadingContext_type = {
    loading : boolean;
    setLoading : Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<loadingContext_type | null>(null);

export const LoadingProvider = ({children} : {children : React.ReactNode}) => {

    const [loading , setLoading] = useState<boolean>(false);

    return(
        <LoadingContext.Provider value={{loading , setLoading}}>
            {children}
        </LoadingContext.Provider>
    )

}


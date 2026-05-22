import { LoadingContext } from "@/Context/LoadingContext";
import { useContext } from "react";

export const useLoading = () => {
    const constext = useContext(LoadingContext);
    if(!constext) throw new Error("useLoading must be used within LoadingProvider");
    return constext;
}
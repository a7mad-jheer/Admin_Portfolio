"use client"
import { useLoading } from "@/hook/ui/useLoading";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const ResetLoading = () => {
const pathname = usePathname();
const {setLoading} = useLoading();

useEffect(() => {
    setLoading(false);
} , [pathname])

return null;
}

export default ResetLoading;
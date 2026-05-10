import { useEffect } from "react";

export const useLockScroll = (isLocked : boolean = false) => {
    return  useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow
        if (isLocked) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = originalStyle || "auto";
        }
    
        return () => {
          document.body.style.overflow = originalStyle || "auto";
        };
      }, [isLocked]);
}
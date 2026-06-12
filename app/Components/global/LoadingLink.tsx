import { useLoading } from "@/hook/ui/useLoading";
import Link from "next/link";
import posthog from "posthog-js";
import { forwardRef } from "react";


type props = {
    href: string;
    children: React.ReactNode;
    styleLoading ?: string
    posthogText ?: string; 
}

export const LoadingLink = forwardRef<HTMLAnchorElement, props>(
  ({ href, children , styleLoading , posthogText },   ref) => {
  const { setLoading } = useLoading();

  const handleClicked = () => {
    setLoading(true)

    if(posthogText) {
      posthog.capture(posthogText, {
        href, 
        label : "LaodingLink"
      })
    }
  }

  return (
    <Link
    ref = {ref}
      href={href}
      onClick={handleClicked}
      className={styleLoading}

    >
      {children}
    </Link>
  );
}
) 

LoadingLink.displayName = "LoadingLink"
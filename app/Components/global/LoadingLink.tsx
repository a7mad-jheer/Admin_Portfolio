import { useLoading } from "@/hook/ui/useLoading";
import Link from "next/link";
import posthog from "posthog-js";

type props = {
    href: string;
    children: React.ReactNode;
    styleLoading ?: string
    posthogText ?: string; 
}

export const LoadingLink = ({ href, children , styleLoading , posthogText } : props) => {
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
      href={href}
      onClick={handleClicked}
      className={styleLoading}

    >
      {children}
    </Link>
  );
};
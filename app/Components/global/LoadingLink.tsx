import { useLoading } from "@/hook/ui/useLoading";
import Link from "next/link";

type props = {
    href: string;
    children: React.ReactNode;
    style ?: string
}

export const LoadingLink = ({ href, children , style } : props) => {
  const { setLoading } = useLoading();

  return (
    <Link
      href={href}
      onClick={() => setLoading(true)}
      className={style}
    >
      {children}
    </Link>
  );
};
import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children }: LinkProps) {
  return (
    <NextLink href={href} className="text-blue-400 hover:underline">
      {children}
    </NextLink>
  );
}

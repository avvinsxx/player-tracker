interface PageHeaderProps {
  children: React.ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
  return <h1 className="mb-3 text-2xl">{children}</h1>;
}

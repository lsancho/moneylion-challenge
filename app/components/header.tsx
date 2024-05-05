interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function Header({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading font-display text-3xl font-bold md:text-4xl">
          {heading}
        </h1>
        {text && <p className="text-muted-foreground text-lg">{text}</p>}
      </div>
      {children}
    </div>
  );
}

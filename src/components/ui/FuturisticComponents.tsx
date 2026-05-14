import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/50",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CyberButton({
  children,
  className,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-8 py-3 font-bold uppercase tracking-widest transition-all duration-300 group",
        variant === "primary" ? "text-white" : "text-blue-400",
        className
      )}
    >
      <span className={cn(
        "absolute inset-0 w-full h-full transition-all duration-300",
        variant === "primary" ? "bg-blue-600 group-hover:bg-blue-500" : "border border-blue-500/50 group-hover:bg-blue-500/10"
      )} />
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}

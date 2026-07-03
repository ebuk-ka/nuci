interface BadgeProps {
  children: React.ReactNode;
}

const Badge = ({ children }: BadgeProps) => (
  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
    {children}
  </span>
);

export default Badge;
import { Menu } from "lucide-react";
import Button from "@/components/ui/Button";

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: HeaderProps) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
      <button
        onClick={onOpenSidebar}
        className="lg:hidden"
      >
        <Menu size={24} />
      </button>

      <h1>Hello user</h1>

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm">Login</Button>
        <Button variant="primary" size="sm">Sign Up</Button>
      </div>
    </header>
  );
};
export default Header;
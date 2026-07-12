import { Menu, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-[#050505] px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden"
        >
          <Menu size={24} />
        </button>

      </div>

      <div className="ml-auto flex items-center gap-3">
        {!user ? (
          <>
            <Link to="/login">
              <Button variant="secondary" size="sm">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 transition-all hover:border-cyan-500"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-semibold text-white">
              {user.fullName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </div>

            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-zinc-800 bg-[#0B0B0B] shadow-2xl transition-all duration-300 ease-out ${
              open
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <div className="border-b border-zinc-800 p-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-xl font-bold text-white">
                  {user.fullName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <h2 className="text-lg font-semibold text-white">
                  {user.fullName}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {user.email}
                </p>
              </div>

              <div className="space-y-2 p-4">
                <Button
                  variant="ghost"
                  fullWidth
                >
                  Profile
                </Button>

                <Button
                  variant="ghost"
                  fullWidth
                >
                  Settings
                </Button>

                <Button
                  variant="danger"
                  fullWidth
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};


export default Header;
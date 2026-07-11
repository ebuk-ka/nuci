import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import Button from "@/components/ui/Button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/images/nucilogo1.png";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (value: string) => {
    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    if (score <= 1) return { label: "Weak", color: "bg-red-500" };
    if (score === 2) return { label: "Fair", color: "bg-yellow-500" };
    if (score === 3) return { label: "Good", color: "bg-blue-500" };
    return { label: "Strong", color: "bg-emerald-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register({
        fullName,
        email,
        password,
      });

      alert("Account created successfully!");

      navigate("/login");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Registration failed.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0B0B0B] p-8">
         <Link
      to="/"
      className="mb-6 inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
    >
      <ArrowLeft size={18} />
      Back
    </Link>
        <div className="mb-8 text-center">
         <img
  src={logo}
  alt="Nuci Logo"
  className="mx-auto h-30 w-35"
/>

          <p className="mt-2 text-sm text-zinc-400">
            AI-powered IT Support
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-white">
            Create Account
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Join Nuci and start using AI-powered IT support.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Dave Benson"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full rounded-xl border border-zinc-700 bg-transparent px-4 py-3 text-white outline-none transition focus:border-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-zinc-700 bg-transparent px-4 py-3 text-white outline-none transition focus:border-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-transparent px-4 py-3 pr-12 text-white outline-none transition focus:border-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {password.length > 0 && (
              <div className="mt-2 space-y-2">
                <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
                  <span>Password strength</span>
                  <span className="text-zinc-300">{passwordStrength.label}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className={`h-full transition-all ${passwordStrength.color}`}
                    style={{ width: `${Math.min((password.length / 12) * 100, 100)}%` }}
                  />
                </div>
                <ul className="space-y-1 text-xs text-zinc-400">
                  <li className={password.length >= 8 ? "text-emerald-400" : ""}>• At least 8 characters</li>
                  <li className={/[A-Z]/.test(password) ? "text-emerald-400" : ""}>• One uppercase letter</li>
                  <li className={/[0-9]/.test(password) ? "text-emerald-400" : ""}>• One number</li>
                  <li className={/[^A-Za-z0-9]/.test(password) ? "text-emerald-400" : ""}>• One special character</li>
                </ul>
              </div>
            )}
          </div>

          <Button
           type="submit"
           variant="primary"
           size="lg"
           fullWidth
           loading={loading}
         >
           Create Account
         </Button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-white hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
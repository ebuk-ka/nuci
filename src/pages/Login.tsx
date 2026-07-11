import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import Button from "@/components/ui/Button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/images/nucilogo1.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

     const response = await login({
  email,
  password,
});

console.log("LOGIN RESPONSE:", response.data);

localStorage.setItem("token", response.data.token);
localStorage.setItem("user", JSON.stringify(response.data.user));

setUser(response.data.user);

navigate("/");
    } catch (error: unknown) {
      const message =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data
              ?.message
          : undefined;

      alert(message ?? "Login failed. Please try again.");
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
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Sign in to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </div>

          <Button
         type="submit"
         size="lg"
         fullWidth
         variant="primary"
         loading={loading}
       >
         Sign In
       </Button>
               </form>
       
        <p className="mt-8 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-white hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
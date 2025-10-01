"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // loading state

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // start loading

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        setIsLoading(false); // stop loading on error
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred");
      setIsLoading(false);
    } finally {
      setIsLoading(false); // ensure loading stops if process ends
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="max-w-md w-full bg-gray-100 p-8 rounded-xl shadow-lg border-t-4 border-green-400 transition-transform hover:scale-101 hover:shadow-xl">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5 mr-2 border-t-green-500 animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
          {error && (
            <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-lg mt-3 shadow-md">
              {error}
            </div>
          )}
          <div className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-green-500 underline hover:text-green-600 transition"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
      {/* Optional: add CSS for loader (if needed) */}
      <style jsx>{`
        .loader {
          border-top-color: transparent;
        }
      `}</style>
    </div>
  );
}

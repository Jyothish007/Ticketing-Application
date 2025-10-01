"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      setIsLoading(false);
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="w-full max-w-md bg-gray-50 p-8 rounded-xl shadow-lg border-t-4 border-green-400 transition-transform hover:scale-101 hover:shadow-xl">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
            required
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5 mr-2 border-t-green-500 animate-spin"></div>
            ) : (
              "Register"
            )}
          </button>

          {error && (
            <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-lg shadow-md mt-3">
              {error}
            </div>
          )}

          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/"
              className="text-green-500 underline hover:text-green-600 transition"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

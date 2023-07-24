"use client";

import React, { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <form onSubmit={handleSubmit}>
          <h4 className="mb-6 text-xl font-semibold">Password Reset</h4>
            {message && <div className="text-emerald-950">{message}</div>}
            {error && <div className="text-rose-600	">{error}</div>}
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="email"
                ref={emailRef}
                required
                className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear "
                id="exampleFormControlInput3"
                placeholder="Email address"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              style={{ backgroundColor: "#1a73e8" }}
            >
              Reset Password
            </button>
          </form>
          <div className="flex items-center justify-between mt-3 pb-6">
            <div className="flex items-center justify-between mt-3 pb-6">
              <p className="mb-0 mr-2">Already have an account?</p>
              <Link href="/login">
                <button
                  type="button"
                  className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  style={{ backgroundColor: "#ea4335", color: "#ffffff" }}
                >
                  Login
                </button>
              </Link>
            </div>
            <div className="flex items-center justify-between mt-3 pb-6">
              <p className="mb-0 mr-2">Need an account?</p>
              <Link href="/signup">
                {" "}
                <button
                  type="button"
                  className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  style={{ backgroundColor: "#ea4335", color: "#ffffff" }}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

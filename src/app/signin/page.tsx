"use client";

import { LoginForm } from "@/components/oauth/login_form";
import { AuthForm } from "@/components/oauth/auth_form";
import { ErrorForm } from "@/components/oauth/error_form";
import { useSession } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";
import { ErrorHandler } from "@/components/oauth/error_handler";

export default function Signin() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center bg-white'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600'></div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className='h-screen flex items-center justify-center bg-white'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600'></div>
        </div>
      }>
      <ErrorHandler>{session ? <AuthForm /> : <LoginForm />}</ErrorHandler>
    </Suspense>
  );
}

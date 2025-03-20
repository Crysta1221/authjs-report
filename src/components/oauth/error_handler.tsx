"use client";

import { useSearchParams } from "next/navigation";
import { ErrorForm } from "./error_form";
import { ReactNode } from "react";

interface ErrorHandlerProps {
  children: ReactNode;
}

export function ErrorHandler({ children }: ErrorHandlerProps) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error) {
    return <ErrorForm />;
  }

  return <>{children}</>;
}

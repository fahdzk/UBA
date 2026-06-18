"use client";

import * as React from "react";
import { cn } from "../lib/utils";

interface ToasterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Toaster = React.forwardRef<HTMLDivElement, ToasterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...props}
    />
  )
);
Toaster.displayName = "Toaster";

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, title, description, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "border-gray-200 bg-white text-gray-900",
      destructive: "border-red-200 bg-red-50 text-red-900",
      success: "border-green-200 bg-green-50 text-green-900",
    };
    return (
      <div
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className="grid gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
      </div>
    );
  }
);
Toast.displayName = "Toast";

function toast({ title, description, variant = "default" }: Omit<ToastProps, "className" | "children">) {
  // Simple toast implementation — in production you'd use a context/provider
  console.log(`[Toast] ${title}: ${description}`);
}

export { Toast, Toaster, toast };

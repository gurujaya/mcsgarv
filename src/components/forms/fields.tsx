"use client";

import * as React from "react";
import { cn } from "cn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const control =
  "h-11 rounded-lg border-line bg-surface text-[15px] text-ink placeholder:text-ink-muted/70 focus-visible:border-mc-purple focus-visible:ring-mc-purple/20 aria-invalid:border-destructive";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(function TextInput({ className, ...props }, ref) {
  return <Input ref={ref} className={cn(control, className)} {...props} />;
});

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof Textarea>
>(function TextArea({ className, ...props }, ref) {
  return (
    <Textarea ref={ref} className={cn(control, "min-h-32 py-3", className)} {...props} />
  );
});

export const SelectInput = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(function SelectInput({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        control,
        "w-full appearance-none rounded-lg border px-3 pr-9 outline-none focus-visible:ring-3",
        "bg-[url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>\")] bg-[length:16px] bg-[position:right_12px_center] bg-no-repeat",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export function FormStatus({
  state,
  success,
  error,
}: {
  state: "idle" | "submitting" | "success" | "error";
  success: string;
  error?: string;
}) {
  if (state === "success")
    return (
      <p
        role="status"
        className="rounded-md border border-line bg-surface px-4 py-3 text-[14px] text-ink"
      >
        {success}
      </p>
    );
  if (state === "error")
    return (
      <p
        role="alert"
        className="rounded-md border border-destructive/30 bg-surface px-4 py-3 text-[14px] text-destructive"
      >
        {error ?? "Something went wrong. Email us instead and we will sort it out."}
      </p>
    );
  return null;
}

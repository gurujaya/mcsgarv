"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "./zod-resolver";
import { Field, TextInput, TextArea, SelectInput, FormStatus } from "./fields";
import { submitForm } from "./submit";
import { concernCategories } from "@/content/concerns";
import type { ConcernCategory } from "@/content/types";

const categoryKeys = Object.keys(concernCategories) as [
  ConcernCategory,
  ...ConcernCategory[],
];

const schema = z.object({
  problem: z.string().min(10, "Say a little more about what is wrong (10+ characters)."),
  category: z.enum(categoryKeys),
  location: z.string().max(120).optional(),
  fix: z.string().max(2000).optional(),
  name: z.string().max(80).optional(),
  email: z
    .union([z.literal(""), z.string().email("Enter a valid email, or leave it blank.")])
    .optional(),
  // Honeypot: real users never fill this.
  website: z.string().max(0).optional(),
});

type Values = z.infer<typeof schema>;

export function ConcernForm() {
  const [state, setState] = React.useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [err, setErr] = React.useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { category: "facilities" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setState("submitting");
    try {
      await submitForm("concern", values);
      setState("success");
      reset();
    } catch (e) {
      setErr(e instanceof Error ? e.message : undefined);
      setState("error");
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <Field label="What is wrong?" htmlFor="k-problem" error={errors.problem?.message}>
        <TextArea
          id="k-problem"
          placeholder="What happened, how often, and who it affects."
          aria-invalid={!!errors.problem}
          {...register("problem")}
        />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="It is about" htmlFor="k-category" error={errors.category?.message}>
          <SelectInput id="k-category" {...register("category")}>
            {categoryKeys.map((k) => (
              <option key={k} value={k}>
                {concernCategories[k]}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Where on campus (optional)" htmlFor="k-location">
          <TextInput
            id="k-location"
            placeholder="Building, room, lot, or area"
            {...register("location")}
          />
        </Field>
      </div>
      <Field
        label="What would fix it? (optional)"
        htmlFor="k-fix"
        hint="If you have a specific ask, SGA can carry that instead of guessing."
      >
        <TextArea id="k-fix" className="min-h-24" {...register("fix")} />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name (optional)" htmlFor="k-name">
          <TextInput id="k-name" autoComplete="name" {...register("name")} />
        </Field>
        <Field
          label="Email (optional)"
          htmlFor="k-email"
          error={errors.email?.message}
          hint="Only if you want to hear what happened to it."
        >
          <TextInput
            id="k-email"
            type="email"
            autoComplete="email"
            placeholder="you@montgomerycollege.edu"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>
      <div className="hidden" aria-hidden>
        <label htmlFor="k-website">Website</label>
        <input id="k-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <FormStatus
        state={state}
        success="Sent. It goes to the SGA Secretary. Once it is logged, it appears on this page without your name."
        error={err}
      />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          className="button-primary"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Sending…" : "Send to SGA"}
        </button>
        <p className="text-[14px] text-ink-muted">
          Your name never appears on the board.
        </p>
      </div>
    </form>
  );
}

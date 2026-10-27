"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "./zod-resolver";
import { Field, TextInput, TextArea, SelectInput, FormStatus } from "./fields";
import { MotionButton } from "@/components/primitives/cta";
import { submitForm } from "./submit";

const schema = z.object({
  club: z.string().min(2, "Which club is this for?"),
  contactName: z.string().min(2, "Who should we contact?"),
  email: z.string().email("Enter a valid email."),
  eventName: z.string().min(2, "Name the event."),
  eventDate: z.string().min(1, "Pick a date (approximate is fine)."),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a dollar amount, numbers only.")
    .refine((v) => Number(v) > 0, "Enter an amount greater than zero."),
  attendance: z.enum(["<25", "25-50", "50-100", "100-250", "250+"]),
  purpose: z
    .string()
    .min(40, "Explain how the event benefits students (40+ characters)."),
  breakdown: z.string().min(20, "List what the money pays for."),
  website: z.string().max(0).optional(),
});

type Values = z.infer<typeof schema>;

export function FundingForm() {
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
    defaultValues: { attendance: "25-50" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setState("submitting");
    try {
      await submitForm("funding", values);
      setState("success");
      reset();
    } catch (e) {
      setErr(e instanceof Error ? e.message : undefined);
      setState("error");
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Club or organization" htmlFor="f-club" error={errors.club?.message}>
          <TextInput id="f-club" aria-invalid={!!errors.club} {...register("club")} />
        </Field>
        <Field label="Your name" htmlFor="f-name" error={errors.contactName?.message}>
          <TextInput
            id="f-name"
            autoComplete="name"
            aria-invalid={!!errors.contactName}
            {...register("contactName")}
          />
        </Field>
      </div>
      <Field label="MC email" htmlFor="f-email" error={errors.email?.message}>
        <TextInput
          id="f-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Event name" htmlFor="f-event" error={errors.eventName?.message}>
          <TextInput
            id="f-event"
            aria-invalid={!!errors.eventName}
            {...register("eventName")}
          />
        </Field>
        <Field label="Event date" htmlFor="f-date" error={errors.eventDate?.message}>
          <TextInput
            id="f-date"
            type="date"
            aria-invalid={!!errors.eventDate}
            {...register("eventDate")}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Amount requested (USD)"
          htmlFor="f-amount"
          error={errors.amount?.message}
        >
          <TextInput
            id="f-amount"
            inputMode="decimal"
            placeholder="350"
            aria-invalid={!!errors.amount}
            {...register("amount")}
          />
        </Field>
        <Field label="Expected attendance" htmlFor="f-attendance">
          <SelectInput id="f-attendance" {...register("attendance")}>
            <option value="<25">Under 25</option>
            <option value="25-50">25–50</option>
            <option value="50-100">50–100</option>
            <option value="100-250">100–250</option>
            <option value="250+">250+</option>
          </SelectInput>
        </Field>
      </div>
      <Field
        label="How does this benefit students?"
        htmlFor="f-purpose"
        error={errors.purpose?.message}
        hint="This is what the Budget Panel evaluates: student engagement and campus community."
      >
        <TextArea
          id="f-purpose"
          aria-invalid={!!errors.purpose}
          {...register("purpose")}
        />
      </Field>
      <Field
        label="Budget breakdown"
        htmlFor="f-breakdown"
        error={errors.breakdown?.message}
        hint="One line per item: food $200, decorations $75, printing $25…"
      >
        <TextArea
          id="f-breakdown"
          aria-invalid={!!errors.breakdown}
          {...register("breakdown")}
        />
      </Field>
      <div className="hidden" aria-hidden>
        <label htmlFor="f-website">Website</label>
        <input id="f-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <FormStatus
        state={state}
        success="Request received. The Treasurer will confirm by email and tell you when the Budget Panel will review it."
        error={err}
      />
      <div>
        <MotionButton type="submit" variant="accent" disabled={state === "submitting"}>
          {state === "submitting" ? "Submitting…" : "Submit funding request"}
        </MotionButton>
      </div>
    </form>
  );
}

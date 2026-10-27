"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "./zod-resolver";
import { Field, TextInput, TextArea, SelectInput, FormStatus } from "./fields";
import { MotionButton } from "@/components/primitives/cta";
import { submitForm } from "./submit";
import { committees } from "@/content/committees";

const schema = z.object({
  name: z.string().min(2, "Tell us your name."),
  email: z.string().email("Enter a valid email so we can reply."),
  topic: z.enum(["concern", "idea", "join", "event", "press", "other"]),
  committee: z.string().optional(),
  message: z.string().min(10, "Give us a little more detail (10+ characters)."),
  // Honeypot: real users never fill this.
  website: z.string().max(0).optional(),
});

type Values = z.infer<typeof schema>;

export function ContactForm({
  defaultTopic = "concern",
  compact,
}: {
  defaultTopic?: Values["topic"];
  compact?: boolean;
}) {
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
    defaultValues: { topic: defaultTopic },
  });

  const onSubmit = handleSubmit(async (values) => {
    setState("submitting");
    try {
      await submitForm(values.topic === "join" ? "interest" : "contact", values);
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
        <Field label="Name" htmlFor="c-name" error={errors.name?.message}>
          <TextInput
            id="c-name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field label="MC email" htmlFor="c-email" error={errors.email?.message}>
          <TextInput
            id="c-email"
            type="email"
            autoComplete="email"
            placeholder="you@montgomerycollege.edu"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>
      <div className={compact ? "grid gap-5" : "grid gap-5 sm:grid-cols-2"}>
        <Field
          label="What is this about?"
          htmlFor="c-topic"
          error={errors.topic?.message}
        >
          <SelectInput id="c-topic" {...register("topic")}>
            <option value="concern">A concern or complaint</option>
            <option value="idea">An idea or proposal</option>
            <option value="join">I want to get involved</option>
            <option value="event">An event or club question</option>
            <option value="press">Media / partnership</option>
            <option value="other">Something else</option>
          </SelectInput>
        </Field>
        <Field label="Committee (optional)" htmlFor="c-committee">
          <SelectInput id="c-committee" {...register("committee")}>
            <option value="">Not sure / general</option>
            {committees.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>
      <Field
        label="Message"
        htmlFor="c-message"
        error={errors.message?.message}
        hint="Goes to the SGA Secretary. We reply within a week during the semester."
      >
        <TextArea
          id="c-message"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>
      <div className="hidden" aria-hidden>
        <label htmlFor="c-website">Website</label>
        <input id="c-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <FormStatus
        state={state}
        success="Sent. Thank you. The Secretary will route it to the right senator or committee."
        error={err}
      />
      <div>
        <MotionButton type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Send message"}
        </MotionButton>
      </div>
    </form>
  );
}

"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { sendEnquiry, type EnquiryState, type FieldName } from "@/app/actions/enquiry";
import { Button } from "@/components/primitives/Button";
import { CONTACT, FORM, INTERESTS, telHref, type Interest } from "@/content";
import { cn } from "@/lib/cn";

const initial: EnquiryState = { status: "idle" };

interface Props {
  defaultInterest?: Interest;
  source?: string;
  onInk?: boolean;
}

/**
 * One enquiry form for /contact and /projects/residential. Server Action +
 * Zod + honeypot; success is inline; failure says what went wrong and always
 * shows the phone number.
 */
export function EnquiryForm({ defaultInterest, source, onInk = false }: Props) {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const phone = CONTACT.details.phone;

  // Fill time is stamped into the DOM after hydration so server and client markup match.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite">
        <p className="type-h3">Thank you. Your enquiry has been sent.</p>
        <p className={cn("type-body mt-3", onInk ? "text-paper/80" : "text-steel-dk")}>
          You can also call{" "}
          <a href={telHref(phone)} className="link-rule tnum">
            {phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const field = (name: FieldName, label: string, input: React.ReactNode) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={id(name)} className="type-small font-medium">
        {label}
      </label>
      {input}
      {errors[name] ? (
        <p id={id(`${name}-error`)} className={cn("type-small", onInk ? "text-paper/80" : "text-soil")}>
          {errors[name]}
        </p>
      ) : null}
    </div>
  );

  const inputProps = (name: FieldName) => ({
    id: id(name),
    name,
    required: true,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? id(`${name}-error`) : undefined,
    className: "field",
  });

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {field("firstName", FORM.fields.firstName, <input type="text" autoComplete="given-name" {...inputProps("firstName")} />)}
        {field("lastName", FORM.fields.lastName, <input type="text" autoComplete="family-name" {...inputProps("lastName")} />)}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {field("phone", FORM.fields.phone, <input type="tel" inputMode="tel" autoComplete="tel" {...inputProps("phone")} />)}
        {field("email", FORM.fields.email, <input type="email" inputMode="email" autoComplete="email" {...inputProps("email")} />)}
      </div>
      {field(
        "interest",
        FORM.fields.interest,
        <select defaultValue={defaultInterest ?? ""} {...inputProps("interest")}>
          <option value="" disabled>
            {FORM.fields.interest}
          </option>
          {INTERESTS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>,
      )}
      {field("message", FORM.fields.message, <textarea rows={5} {...inputProps("message")} />)}

      {/* Honeypot and fill-time; both invisible to people. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="0" />
      {source ? <input type="hidden" name="source" value={source} /> : null}

      <div role="alert" aria-live="assertive" className="min-h-[1.5rem]">
        {state.status === "error" ? (
          <p className={cn("type-small", onInk ? "text-paper/85" : "text-soil")}>
            {state.message} Or call{" "}
            <a href={telHref(phone)} className="link-rule tnum">
              {phone}
            </a>
            .
          </p>
        ) : null}
      </div>

      <div>
        <Button type="submit" inverted={onInk} disabled={pending} aria-busy={pending}>
          {FORM.submit}
        </Button>
      </div>
    </form>
  );
}

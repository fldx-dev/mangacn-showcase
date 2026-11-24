"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ONBOARDING_COOKIE, SESSION_COOKIE } from "@/lib/session";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
} as const;

// Any input logs in: the form's values are never read or stored, only a flag cookie is set.
export async function signIn() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "demo", COOKIE_OPTIONS);
  redirect("/app");
}

// Sign-up is sign-in plus the first-run flag, so the onboarding shows once.
export async function signUp() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "demo", COOKIE_OPTIONS);
  jar.set(ONBOARDING_COOKIE, "pending", COOKIE_OPTIONS);
  redirect("/welcome");
}

// Finishing the onboarding's last form step: clear the flag but stay, so the summary shows.
export async function completeOnboarding() {
  const jar = await cookies();
  jar.delete(ONBOARDING_COOKIE);
}

// "Skip for now": clear the flag and go straight to the dashboard.
export async function skipOnboarding() {
  const jar = await cookies();
  jar.delete(ONBOARDING_COOKIE);
  redirect("/app");
}

export async function signOut() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  jar.delete(ONBOARDING_COOKIE);
  redirect("/login");
}

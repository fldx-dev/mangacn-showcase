"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/session";

// Any input logs in: the form's values are never read or stored, only a flag cookie is set.
export async function signIn() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "demo", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/app");
}

export async function signOut() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/login");
}

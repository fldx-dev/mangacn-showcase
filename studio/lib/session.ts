// Fake auth for the demo: one flag cookie, no user data, no passwords. Any login sets it.
export const SESSION_COOKIE = "studio_session";

// Set by sign-up only: while it is there, /app sends the new user to /welcome. Finishing or
// skipping the onboarding deletes it, so the flow shows once.
export const ONBOARDING_COOKIE = "studio_onboarding";

"use client";

import { toast } from "sonner";
import { ProfileForm } from "@/components/profile-form";
import { SettingsForm } from "@/components/settings-form";
import { UploadForm } from "@/components/upload-form";
import { studioProfile, studioSettings, studioUploadSeries } from "@/lib/studio-data";

// The blocks' save callbacks, wired to a visible toast. Nothing is sent anywhere: the blocks only
// announce a save to screen readers (see FINDINGS.md), so the toast is the sighted confirmation.
const DEMO_NOTE = "Demo desk: kept in this tab only, nothing was sent.";

export function StudioUploadForm() {
  return (
    <UploadForm
      series={studioUploadSeries}
      onPublish={(chapter, pages) =>
        toast.success(`Chapter ${chapter.chapter} ready: ${chapter.title}`, {
          description: `${pages.length} ${pages.length === 1 ? "page" : "pages"} listed. ${DEMO_NOTE}`,
        })
      }
    />
  );
}

export function StudioProfileForm() {
  return (
    <ProfileForm
      defaultValues={studioProfile}
      onSaveProfile={() => toast.success("Profile saved", { description: DEMO_NOTE })}
      onSavePassword={() => toast.success("Password changed", { description: DEMO_NOTE })}
    />
  );
}

export function StudioSettingsForm() {
  return (
    <SettingsForm
      defaultValues={studioSettings}
      onSave={() => toast.success("Settings saved", { description: DEMO_NOTE })}
      onDeleteAccount={() =>
        toast("Account deletion requested", {
          description: "Demo desk: the account is not real, so nothing was deleted.",
        })
      }
    />
  );
}

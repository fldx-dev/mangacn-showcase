import type { Metadata } from "next";
import { FileManager } from "@/components/file-manager";
import { StudioUploadForm } from "@/components/studio/desk-forms";
import { studioFiles, studioFolders, studioStartFolder } from "@/lib/studio-data";

export const metadata: Metadata = { title: "Files" };

// file-manager-01 for the studio's folders and upload-01 for the next chapter. Both keep picked
// files in browser state only: nothing is stored, and a reload brings back the sample list.
export default function FilesPage() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl leading-tight uppercase">Files</h1>
        <p className="text-sm text-muted-foreground">
          Pages, tone layers, covers and scripts by series. Uploads stay in this tab.
        </p>
      </div>
      <FileManager
        folders={studioFolders}
        defaultFiles={studioFiles}
        defaultFolder={studioStartFolder}
      />
      {/* upload-01 brings its own "New chapter" heading. */}
      <div className="max-w-3xl pb-6">
        <StudioUploadForm />
      </div>
    </>
  );
}

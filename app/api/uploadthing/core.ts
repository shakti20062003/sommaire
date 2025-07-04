// app/api/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ Upload completed for user id:", metadata.userId);
      console.log("📄 File key:", file.key);

      return {
        userId: metadata.userId,
        fileUrl: file.url,
        fileName: file.name, // 🔁 FIXED: was 'filName'
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

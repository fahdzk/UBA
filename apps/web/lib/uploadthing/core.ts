import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

// Middleware to check auth
const middleware = async () => {
  const { userId } = await auth();
  if (!userId) throw new UploadThingError("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  // Profile photos — single image, max 4MB
  profilePhoto: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Profile photo uploaded:", file.key, "by user:", metadata.userId);
      return { uploadedBy: metadata.userId, url: file.url, key: file.key };
    }),

  // Violation evidence — images + PDFs
  violationEvidence: f({
    image: { maxFileSize: "8MB", maxFileCount: 5 },
    pdf: { maxFileSize: "16MB", maxFileCount: 3 },
  })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Violation evidence uploaded:", file.key);
      return { uploadedBy: metadata.userId, url: file.url, key: file.key };
    }),

  // Legal case documents
  legalDocuments: f({
    pdf: { maxFileSize: "32MB", maxFileCount: 10 },
    image: { maxFileSize: "8MB", maxFileCount: 10 },
  })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Legal document uploaded:", file.key);
      return { uploadedBy: metadata.userId, url: file.url, key: file.key };
    }),

  // Agency logos
  agencyLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Agency logo uploaded:", file.key);
      return { uploadedBy: metadata.userId, url: file.url, key: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

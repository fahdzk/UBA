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

// Public middleware — no auth required for apply form
const publicMiddleware = async () => {
  return { userId: "anonymous" };
};

export const ourFileRouter = {
  // Profile photos — single image, max 4MB
  profilePhoto: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url, key: file.key };
    }),

  // Violation evidence — images + PDFs
  violationEvidence: f({
    image: { maxFileSize: "8MB", maxFileCount: 5 },
    pdf: { maxFileSize: "16MB", maxFileCount: 3 },
  })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url, key: file.key };
    }),

  // Legal case documents
  legalDocuments: f({
    pdf: { maxFileSize: "32MB", maxFileCount: 10 },
    image: { maxFileSize: "8MB", maxFileCount: 10 },
  })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url, key: file.key };
    }),

  // Agency logos
  agencyLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url, key: file.key };
    }),

  // ── Brand Ambassador Application Uploads ──

  // Headshot — required, JPG/PNG, max 10MB
  headshotUploader: f({ image: { maxFileSize: "10MB", maxFileCount: 1 } })
    .middleware(publicMiddleware)
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, key: file.key };
    }),

  // Full body shot — required, JPG/PNG, max 10MB
  fullBodyUploader: f({ image: { maxFileSize: "10MB", maxFileCount: 1 } })
    .middleware(publicMiddleware)
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, key: file.key };
    }),

  // Resume — optional, PDF/DOC/DOCX, max 10MB
  resumeUploader: f({
    pdf: { maxFileSize: "10MB", maxFileCount: 1 },
    "application/msword": { maxFileSize: "10MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "10MB", maxFileCount: 1 },
  })
    .middleware(publicMiddleware)
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, key: file.key };
    }),

  // Intro video — optional, MP4/MOV, max 100MB
  introVideoUploader: f({
    video: { maxFileSize: "100MB", maxFileCount: 1 },
    "video/mp4": { maxFileSize: "100MB", maxFileCount: 1 },
    "video/quicktime": { maxFileSize: "100MB", maxFileCount: 1 },
  })
    .middleware(publicMiddleware)
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, key: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

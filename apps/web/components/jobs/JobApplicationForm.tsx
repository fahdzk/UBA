"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
  open: boolean;
  onClose: () => void;
}

export function JobApplicationForm({ jobId, jobTitle, open, onClose }: JobApplicationFormProps) {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          setMessage("");
        }, 2000);
      }
    } catch (err) {
      console.error("Application failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apply for Position</DialogTitle>
        </DialogHeader>
        {success ? (
          <div className="py-8 text-center">
            <p className="font-heading text-lg font-semibold text-emerald-600">Application submitted!</p>
            <p className="mt-1 text-sm text-slate-500">Good luck with &quot;{jobTitle}&quot;</p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-600">Applying for: <strong>{jobTitle}</strong></p>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional message to the agency..."
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={submitting} className="bg-brand-red hover:bg-brand-red-hover">
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

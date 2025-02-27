
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LearnMoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  content: React.ReactNode;
}

export function LearnMoreDialog({
  isOpen,
  onClose,
  title,
  description,
  content
}: LearnMoreDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {content}
        </div>
        <DialogClose asChild className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

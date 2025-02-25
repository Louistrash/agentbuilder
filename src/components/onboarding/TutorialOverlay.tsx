
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export function TutorialOverlay() {
  const [show, setShow] = useState(false);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="bg-[#1C2128] border border-[#30363D] rounded-xl p-6 max-w-lg w-full">
          <h2 className="text-xl font-semibold text-white mb-4">Welcome to Agent Builder</h2>
          <p className="text-gray-400 mb-6">
            Let's walk through the key features to help you get started building your own AI agents.
          </p>
          <div className="flex justify-end gap-4">
            <Button
              variant="ghost"
              onClick={() => setShow(false)}
              className="text-gray-400 hover:text-white hover:bg-[#30363D]"
            >
              Skip Tutorial
            </Button>
            <Button
              onClick={() => setShow(false)}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Start Tour
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

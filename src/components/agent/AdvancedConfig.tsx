
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function AdvancedConfig() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="temperature">Temperature</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="temperature"
              defaultValue={[0.7]}
              max={1}
              step={0.1}
              className="flex-1"
            />
            <span className="text-sm text-gray-400 w-12">0.7</span>
          </div>
        </div>

        <div>
          <Label htmlFor="max-tokens">Max Tokens</Label>
          <Input
            id="max-tokens"
            type="number"
            defaultValue={2048}
            className="bg-[#1C2128] border-[#30363D]"
          />
        </div>

        <div>
          <Label htmlFor="system-prompt">System Prompt</Label>
          <textarea
            id="system-prompt"
            className="w-full h-32 bg-[#1C2128] border border-[#30363D] rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter system prompt..."
          />
        </div>
      </div>
    </div>
  );
}

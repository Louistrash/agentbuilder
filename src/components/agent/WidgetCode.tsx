import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
export function WidgetCode() {
  const widgetCode = `<script>
  window.agentConfig = {
    agentId: "abc123",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.example.com/agent-widget.js"></script>`;
  const handleCopy = () => {
    navigator.clipboard.writeText(widgetCode);
  };
  return <div className="space-y-4">
      <div className="relative">
        <pre className="border border-[#30363D] rounded-lg p-4 text-sm font-mono overflow-x-auto bg-slate-500">
          {widgetCode}
        </pre>
        <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={handleCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-sm text-gray-400">
        Add this code to your website to embed the agent widget.
      </p>
    </div>;
}
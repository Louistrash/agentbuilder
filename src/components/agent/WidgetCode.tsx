
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WidgetCode() {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);
  
  const widgetCode = `<script>
  window.agentConfig = {
    agentId: "abc123",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.example.com/agent-widget.js"></script>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(widgetCode);
    setHasCopied(true);
    toast({
      title: "Copied!",
      description: "Widget code has been copied to clipboard",
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <pre className="border border-[#30363D] rounded-lg p-4 text-sm font-mono overflow-x-auto bg-[#1C2128] text-white">
          {widgetCode}
        </pre>
        <Button 
          size="sm" 
          variant="ghost" 
          className="absolute top-2 right-2 text-gray-400 hover:text-[#F97316] hover:bg-transparent"
          onClick={handleCopy}
        >
          {hasCopied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
      <p className="text-sm text-gray-400">
        Add this code to your website to embed the agent widget.
      </p>
    </div>
  );
}

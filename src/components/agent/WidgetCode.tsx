
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface WidgetCodeProps {
  agentId?: string;
}

export function WidgetCode({ agentId = '' }: WidgetCodeProps) {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);
  const [position, setPosition] = useState('bottom-right');
  const [theme, setTheme] = useState('light');
  
  const widgetCode = `<script>
  window.agentConfig = {
    agentId: "${agentId}",
    position: "${position}",
    theme: "${theme}"
  };
</script>
<script src="${window.location.origin}/widget.js"></script>`;

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="position">Widget Position</Label>
          <Select
            value={position}
            onValueChange={setPosition}
            options={[
              { value: 'bottom-right', label: 'Bottom Right' },
              { value: 'bottom-left', label: 'Bottom Left' },
              { value: 'top-right', label: 'Top Right' },
              { value: 'top-left', label: 'Top Left' },
            ]}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="theme">Widget Theme</Label>
          <Select
            value={theme}
            onValueChange={setTheme}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ]}
          />
        </div>
      </div>

      <div className="relative mt-4">
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
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Installation Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
          <li>Copy the code snippet above</li>
          <li>In WordPress, edit your theme's header.php file or use a header scripts plugin</li>
          <li>Paste the code just before the closing &lt;/head&gt; tag</li>
          <li>Save the changes and refresh your WordPress site</li>
        </ol>
        <p className="text-sm text-gray-400 mt-4">
          The chat widget will appear in the selected position on all pages of your WordPress site.
          You can customize the appearance and behavior using the options above.
        </p>
      </div>
    </div>
  );
}

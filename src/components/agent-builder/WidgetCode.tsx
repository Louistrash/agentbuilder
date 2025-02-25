
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface WidgetCodeProps {
  agentId: string;
}

export function WidgetCode({ agentId }: WidgetCodeProps) {
  const [copied, setCopied] = useState(false);

  const scriptCode = `<script>
  window.chatAgentConfig = {
    agentId: "${agentId}",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.chatservice.co/widget.js"></script>`;

  const shortCode = `[chat-agent id="${agentId}"]`;

  const handleCopyCode = (code: string, type: 'widget' | 'shortcode') => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied!",
      description: `${type === 'widget' ? 'Widget' : 'Shortcode'} code has been copied to clipboard.`,
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Widget Code</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add this code to your website to embed the chat widget.
        </p>
        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            {scriptCode}
          </pre>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={() => handleCopyCode(scriptCode, 'widget')}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Shortcode</h3>
        <p className="text-sm text-gray-500 mb-4">
          Use this shortcode to embed the chat agent in your CMS.
        </p>
        <div className="flex gap-2">
          <Input
            readOnly
            value={shortCode}
            className="font-mono bg-gray-100"
          />
          <Button
            variant="outline"
            onClick={() => handleCopyCode(shortCode, 'shortcode')}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Configuration Options</h4>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• position: "bottom-right" | "bottom-left" | "top-right" | "top-left"</li>
          <li>• theme: "light" | "dark" | "auto"</li>
          <li>• width: number (default: 380)</li>
          <li>• height: number (default: 600)</li>
        </ul>
      </div>
    </div>
  );
}

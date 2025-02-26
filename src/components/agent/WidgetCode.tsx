
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

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
    <Card className="border-0 bg-[#1C1C1C] shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">Widget Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="position" className="text-gray-400">Widget Position</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger className="bg-[#2C2C2C] border-[#3C3C3C] text-white">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent className="bg-[#2C2C2C] border-[#3C3C3C]">
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                <SelectItem value="top-right">Top Right</SelectItem>
                <SelectItem value="top-left">Top Left</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme" className="text-gray-400">Widget Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="bg-[#2C2C2C] border-[#3C3C3C] text-white">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent className="bg-[#2C2C2C] border-[#3C3C3C]">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative mt-6">
          <pre className="rounded-lg p-4 text-sm font-mono overflow-x-auto bg-[#2C2C2C] text-white border border-[#3C3C3C]">
            {widgetCode}
          </pre>
          <Button 
            size="sm" 
            variant="ghost" 
            className="absolute top-2 right-2 text-gray-400 hover:text-white hover:bg-[#3C3C3C]"
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
          <h3 className="text-lg font-medium text-white">Installation Instructions</h3>
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
      </CardContent>
    </Card>
  );
}

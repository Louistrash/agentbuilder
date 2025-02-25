
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TestInterfaceProps {
  systemPrompt: string;
  temperature: number;
  model: string;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export function TestInterface({
  systemPrompt,
  temperature,
  model,
  maxTokens,
  topP,
  frequencyPenalty,
  presencePenalty,
}: TestInterfaceProps) {
  const [testMessages, setTestMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTest = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setTestMessages(prev => [...prev, { role: 'user', content: userInput }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...testMessages, { role: 'user', content: userInput }],
          systemPrompt,
          temperature,
          model,
          max_tokens: maxTokens,
          top_p: topP,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty
        }),
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      setTestMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.message }
      ]);
    } catch (error) {
      console.error('Error testing agent:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to test agent. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Test Your Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border p-4 mb-4">
          {testMessages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground ml-12'
                  : 'bg-muted mr-12'
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="text-center text-muted-foreground">
              Thinking...
            </div>
          )}
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message to test..."
            onKeyPress={(e) => e.key === 'Enter' && handleTest()}
          />
          <Button onClick={handleTest} disabled={isLoading}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

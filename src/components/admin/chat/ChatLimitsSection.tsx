import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
interface ChatLimitsSectionProps {
  maxMessagesPerChat: string;
  responseDelay: string;
  contextMemory: {
    enabled: boolean;
    messageHistory: number;
  };
  learningMode: {
    enabled: boolean;
    adaptationRate: number;
  };
  onSettingChange: (key: string, value: string | number | boolean | object) => void;
}
export const ChatLimitsSection = ({
  maxMessagesPerChat,
  responseDelay,
  contextMemory,
  learningMode,
  onSettingChange
}: ChatLimitsSectionProps) => {
  return <section className="space-y-6 bg-gray-800">
      <h2 className="text-xl font-semibold text-zinc-300">Chat Performance & Memory</h2>
      
      {/* Basic Chat Limits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 bg-gray-800">
          <Label htmlFor="maxMessages" className="bg-zinc-700">Maximum Messages per Chat</Label>
          <Input id="maxMessages" type="number" value={maxMessagesPerChat} onChange={e => onSettingChange('maxMessagesPerChat', e.target.value)} min="1" max="100" />
          <p className="text-sm text-gray-500">
            Limit the number of messages in a single chat session
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="responseDelay" className="bg-zinc-100">Response Delay (ms)</Label>
          <Input id="responseDelay" type="number" value={responseDelay} onChange={e => onSettingChange('responseDelay', e.target.value)} min="0" max="2000" />
          <p className="text-sm text-gray-500">
            Add a slight delay before showing AI responses
          </p>
        </div>
      </div>

      {/* Context Memory Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-900">
          <div className="space-y-0.5">
            <Label htmlFor="contextMemory" className="bg-slate-700">Context Memory</Label>
            <p className="text-sm text-zinc-50">
              Enable conversation history retention
            </p>
          </div>
          <Switch id="contextMemory" checked={contextMemory.enabled} onCheckedChange={checked => onSettingChange('contextMemory', {
          ...contextMemory,
          enabled: checked
        })} />
        </div>
        
        {contextMemory.enabled && <div className="space-y-2">
            <Label htmlFor="messageHistory">Message History Length</Label>
            <Input id="messageHistory" type="number" value={contextMemory.messageHistory} onChange={e => onSettingChange('contextMemory', {
          ...contextMemory,
          messageHistory: parseInt(e.target.value)
        })} min="5" max="50" />
            <p className="text-sm text-gray-500">
              Number of previous messages to retain for context
            </p>
          </div>}
      </div>

      {/* Learning Mode Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="learningMode">Real-Time Learning</Label>
            <p className="text-sm text-gray-500">
              Allow AI to learn and adapt from conversations
            </p>
          </div>
          <Switch id="learningMode" checked={learningMode.enabled} onCheckedChange={checked => onSettingChange('learningMode', {
          ...learningMode,
          enabled: checked
        })} />
        </div>
        
        {learningMode.enabled && <div className="space-y-2">
            <Label htmlFor="adaptationRate">Learning Rate</Label>
            <Input id="adaptationRate" type="number" value={learningMode.adaptationRate} onChange={e => onSettingChange('learningMode', {
          ...learningMode,
          adaptationRate: parseFloat(e.target.value)
        })} min="0.1" max="1.0" step="0.1" />
            <p className="text-sm text-gray-500">
              Rate at which the AI adapts to new information (0.1 - 1.0)
            </p>
          </div>}
      </div>
    </section>;
};
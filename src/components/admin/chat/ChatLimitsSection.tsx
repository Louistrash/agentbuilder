
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
  return (
    <section className="space-y-6 bg-[#161B22]/95 rounded-lg p-6 border border-white/10">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
        Chat Performance & Memory
      </h2>
      
      {/* Basic Chat Limits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maxMessages" className="text-white/80">Maximum Messages per Chat</Label>
          <Input 
            id="maxMessages" 
            type="number" 
            value={maxMessagesPerChat} 
            onChange={e => onSettingChange('maxMessagesPerChat', e.target.value)} 
            min="1" 
            max="100"
            className="bg-[#1A1F2C] border-white/10 text-white focus:border-white/20 focus:ring-white/20"
          />
          <p className="text-sm text-white/60">
            Limit the number of messages in a single chat session
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="responseDelay" className="text-white/80">Response Delay (ms)</Label>
          <Input 
            id="responseDelay" 
            type="number" 
            value={responseDelay} 
            onChange={e => onSettingChange('responseDelay', e.target.value)} 
            min="0" 
            max="2000"
            className="bg-[#1A1F2C] border-white/10 text-white focus:border-white/20 focus:ring-white/20"
          />
          <p className="text-sm text-white/60">
            Add a slight delay before showing AI responses
          </p>
        </div>
      </div>

      {/* Context Memory Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="contextMemory" className="text-white/80">Context Memory</Label>
            <p className="text-sm text-white/60">
              Enable conversation history retention
            </p>
          </div>
          <Switch 
            id="contextMemory" 
            checked={contextMemory.enabled} 
            onCheckedChange={checked => onSettingChange('contextMemory', {
              ...contextMemory,
              enabled: checked
            })} 
          />
        </div>
        
        {contextMemory.enabled && (
          <div className="space-y-2">
            <Label htmlFor="messageHistory" className="text-white/80">Message History Length</Label>
            <Input 
              id="messageHistory" 
              type="number" 
              value={contextMemory.messageHistory} 
              onChange={e => onSettingChange('contextMemory', {
                ...contextMemory,
                messageHistory: parseInt(e.target.value)
              })} 
              min="5" 
              max="50"
              className="bg-[#1A1F2C] border-white/10 text-white focus:border-white/20 focus:ring-white/20"
            />
            <p className="text-sm text-white/60">
              Number of previous messages to retain for context
            </p>
          </div>
        )}
      </div>

      {/* Learning Mode Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="learningMode" className="text-white/80">Real-Time Learning</Label>
            <p className="text-sm text-white/60">
              Allow AI to learn and adapt from conversations
            </p>
          </div>
          <Switch 
            id="learningMode" 
            checked={learningMode.enabled} 
            onCheckedChange={checked => onSettingChange('learningMode', {
              ...learningMode,
              enabled: checked
            })} 
          />
        </div>
        
        {learningMode.enabled && (
          <div className="space-y-2">
            <Label htmlFor="adaptationRate" className="text-white/80">Learning Rate</Label>
            <Input 
              id="adaptationRate" 
              type="number" 
              value={learningMode.adaptationRate} 
              onChange={e => onSettingChange('learningMode', {
                ...learningMode,
                adaptationRate: parseFloat(e.target.value)
              })} 
              min="0.1" 
              max="1.0" 
              step="0.1"
              className="bg-[#1A1F2C] border-white/10 text-white focus:border-white/20 focus:ring-white/20"
            />
            <p className="text-sm text-white/60">
              Rate at which the AI adapts to new information (0.1 - 1.0)
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

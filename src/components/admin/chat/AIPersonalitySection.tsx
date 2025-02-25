import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
interface AIPersonalitySectionProps {
  aiPersonality: string;
  fallbackMessage: string;
  reasoningLevel: string;
  emotionalIntelligence: boolean;
  onSettingChange: (key: string, value: string | boolean) => void;
}
export const AIPersonalitySection = ({
  aiPersonality,
  fallbackMessage,
  reasoningLevel,
  emotionalIntelligence,
  onSettingChange
}: AIPersonalitySectionProps) => {
  return <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-50">AI Personality & Intelligence</h2>
      
      {/* AI Personality Configuration */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="aiPersonality" className="text-sm font-medium">
            AI Personality Description
          </label>
          <Textarea id="aiPersonality" value={aiPersonality} onChange={e => onSettingChange('aiPersonality', e.target.value)} placeholder="Define your AI agent's personality, expertise, and communication style" className="h-64" />
          <p className="text-sm text-gray-500">
            Craft your AI agent's unique personality, tone, and domain expertise
          </p>
        </div>

        {/* Reasoning Level Selection */}
        <div className="space-y-2">
          <Label htmlFor="reasoningLevel">Reasoning Level</Label>
          <Select value={reasoningLevel} onValueChange={value => onSettingChange('reasoningLevel', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select reasoning level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic - Fast, instinctive responses</SelectItem>
              <SelectItem value="advanced">Advanced - Balanced reasoning</SelectItem>
              <SelectItem value="expert">Expert - Deep analytical thinking</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">
            Adjust how thoroughly your AI agent processes and responds to queries
          </p>
        </div>

        {/* Emotional Intelligence Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="emotionalIntelligence">Emotional Intelligence</Label>
            <p className="text-sm text-gray-500">
              Enable empathetic responses based on user sentiment
            </p>
          </div>
          <Switch id="emotionalIntelligence" checked={emotionalIntelligence} onCheckedChange={checked => onSettingChange('emotionalIntelligence', checked)} />
        </div>

        {/* Fallback Message Configuration */}
        <div className="space-y-2">
          <label htmlFor="fallbackMessage" className="text-sm font-medium">
            Fallback Message
          </label>
          <Textarea id="fallbackMessage" value={fallbackMessage} onChange={e => onSettingChange('fallbackMessage', e.target.value)} placeholder="Default message when AI cannot provide a specific answer" className="h-24" />
          <p className="text-sm text-gray-500">
            Message shown when the AI cannot provide a specific answer
          </p>
        </div>
      </div>
    </section>;
};
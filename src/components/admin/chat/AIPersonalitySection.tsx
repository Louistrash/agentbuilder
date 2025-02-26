
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
  return (
    <section className="space-y-6 bg-[#161B22]/95 rounded-lg p-6 border border-white/10">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
        AI Personality & Intelligence
      </h2>
      
      {/* AI Personality Configuration */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="aiPersonality" className="text-white/80">
            AI Personality Description
          </Label>
          <Textarea 
            id="aiPersonality" 
            value={aiPersonality} 
            onChange={e => onSettingChange('aiPersonality', e.target.value)} 
            placeholder="Define your AI agent's personality, expertise, and communication style" 
            className="h-64 bg-[#1A1F2C] border-white/10 text-white focus:border-white/20 focus:ring-white/20 placeholder:text-white/40"
          />
          <p className="text-sm text-white/60">
            Craft your AI agent's unique personality, tone, and domain expertise
          </p>
        </div>

        {/* Reasoning Level Selection */}
        <div className="space-y-2">
          <Label htmlFor="reasoningLevel" className="text-white/80">Reasoning Level</Label>
          <Select value={reasoningLevel} onValueChange={value => onSettingChange('reasoningLevel', value)}>
            <SelectTrigger className="w-full bg-[#1A1F2C] border-white/10 text-white">
              <SelectValue placeholder="Select reasoning level" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1F2C] border-white/10">
              <SelectItem value="basic" className="text-white hover:bg-white/5">Basic - Fast, instinctive responses</SelectItem>
              <SelectItem value="advanced" className="text-white hover:bg-white/5">Advanced - Balanced reasoning</SelectItem>
              <SelectItem value="expert" className="text-white hover:bg-white/5">Expert - Deep analytical thinking</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-white/60">
            Adjust how thoroughly your AI agent processes and responds to queries
          </p>
        </div>

        {/* Emotional Intelligence Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="emotionalIntelligence" className="text-white/80">Emotional Intelligence</Label>
            <p className="text-sm text-white/60">
              Enable empathetic responses based on user sentiment
            </p>
          </div>
          <Switch 
            id="emotionalIntelligence" 
            checked={emotionalIntelligence} 
            onCheckedChange={checked => onSettingChange('emotionalIntelligence', checked)}
          />
        </div>

        {/* Fallback Message Configuration */}
        <div className="space-y-2">
          <Label htmlFor="fallbackMessage" className="text-white/80">
            Fallback Message
          </Label>
          <Textarea 
            id="fallbackMessage" 
            value={fallbackMessage} 
            onChange={e => onSettingChange('fallbackMessage', e.target.value)} 
            placeholder="Default message when AI cannot provide a specific answer" 
            className="h-24 bg-[#1A1F2C] border-white/10 text-white focus:border-white/20 focus:ring-white/20 placeholder:text-white/40"
          />
          <p className="text-sm text-white/60">
            Message shown when the AI cannot provide a specific answer
          </p>
        </div>
      </div>
    </section>
  );
};

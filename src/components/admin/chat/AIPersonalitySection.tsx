
import { Textarea } from "@/components/ui/textarea";

interface AIPersonalitySectionProps {
  aiPersonality: string;
  fallbackMessage: string;
  onSettingChange: (key: string, value: string) => void;
}

export const AIPersonalitySection = ({
  aiPersonality,
  fallbackMessage,
  onSettingChange,
}: AIPersonalitySectionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">AI Personality & Responses</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="aiPersonality" className="text-sm font-medium">
            AI Personality Description
          </label>
          <Textarea
            id="aiPersonality"
            value={aiPersonality}
            onChange={(e) => onSettingChange('aiPersonality', e.target.value)}
            placeholder="Describe how the AI should behave and communicate"
            className="h-32"
          />
          <p className="text-sm text-gray-500">
            Define the AI's personality and communication style
          </p>
        </div>
        <div className="space-y-2">
          <label htmlFor="fallbackMessage" className="text-sm font-medium">
            Fallback Message
          </label>
          <Textarea
            id="fallbackMessage"
            value={fallbackMessage}
            onChange={(e) => onSettingChange('fallbackMessage', e.target.value)}
            placeholder="Default message when AI cannot provide a specific answer"
            className="h-24"
          />
          <p className="text-sm text-gray-500">
            Message shown when the AI cannot provide a specific answer
          </p>
        </div>
      </div>
    </section>
  );
};

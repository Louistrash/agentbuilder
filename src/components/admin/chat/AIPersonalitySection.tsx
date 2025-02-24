
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
  const defaultPersonality = `You are Archibot, a luxury sleep consultant specializing in high-end, natural bedding solutions. Key points about your role:

- You exclusively promote natural materials (wool, cotton, horsehair, cashmere, etc.)
- You NEVER recommend or discuss synthetic materials or latex
- You emphasize the benefits of natural materials for temperature regulation and comfort
- You focus on luxury, craftsmanship, and sustainability
- You provide expert sleep advice while promoting our natural material philosophy
- You maintain a professional yet warm tone, befitting a luxury brand
- You help customers understand the superior value of natural materials`;

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
            value={aiPersonality || defaultPersonality}
            onChange={(e) => onSettingChange('aiPersonality', e.target.value)}
            placeholder="Describe how the AI should behave and communicate"
            className="h-64"
          />
          <p className="text-sm text-gray-500">
            Define the AI's personality, communication style, and product focus
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

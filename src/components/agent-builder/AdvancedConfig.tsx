
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AdvancedConfigProps {
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  topP: number;
  setTopP: (value: number) => void;
  frequencyPenalty: number;
  setFrequencyPenalty: (value: number) => void;
  presencePenalty: number;
  setPresencePenalty: (value: number) => void;
}

export function AdvancedConfig({
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  topP,
  setTopP,
  frequencyPenalty,
  setFrequencyPenalty,
  presencePenalty,
  setPresencePenalty,
}: AdvancedConfigProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Advanced Configuration</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {showAdvanced ? "Hide" : "Show"} Advanced Options
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="space-y-4 mt-4">
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium mb-1">
            Temperature: {temperature}
          </label>
          <Input
            id="temperature"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Controls randomness: Lower values are more focused, higher values more creative.
          </p>
        </div>

        <div>
          <label htmlFor="maxTokens" className="block text-sm font-medium mb-1">
            Max Tokens: {maxTokens}
          </label>
          <Input
            id="maxTokens"
            type="range"
            min="100"
            max="4000"
            step="100"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Maximum length of the generated response.
          </p>
        </div>

        <div>
          <label htmlFor="topP" className="block text-sm font-medium mb-1">
            Top P: {topP}
          </label>
          <Input
            id="topP"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={topP}
            onChange={(e) => setTopP(parseFloat(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Controls diversity via nucleus sampling.
          </p>
        </div>

        <div>
          <label htmlFor="frequencyPenalty" className="block text-sm font-medium mb-1">
            Frequency Penalty: {frequencyPenalty}
          </label>
          <Input
            id="frequencyPenalty"
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={frequencyPenalty}
            onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Reduces repetition of frequently used words.
          </p>
        </div>

        <div>
          <label htmlFor="presencePenalty" className="block text-sm font-medium mb-1">
            Presence Penalty: {presencePenalty}
          </label>
          <Input
            id="presencePenalty"
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={presencePenalty}
            onChange={(e) => setPresencePenalty(parseFloat(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Encourages the model to talk about new topics.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

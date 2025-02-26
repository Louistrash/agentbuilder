
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MultimodalSectionProps {
  multimodalSupport: {
    images: boolean;
    voice: boolean;
    video: boolean;
  };
  voiceSettings: {
    enabled: boolean;
    language: string;
    voice: string;
  };
  onSettingChange: (key: string, value: string | number | boolean | object) => void;
}

export const MultimodalSection = ({
  multimodalSupport,
  voiceSettings,
  onSettingChange,
}: MultimodalSectionProps) => {
  return (
    <section className="space-y-6 rounded-lg bg-[#161B22]/90 backdrop-blur-xl border border-white/10 p-4">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
        Multimodal Capabilities
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="imageSupport" className="text-white/90">Image Processing</Label>
            <p className="text-sm text-white/60">
              Allow AI to understand and generate image content
            </p>
          </div>
          <Switch
            id="imageSupport"
            checked={multimodalSupport.images}
            onCheckedChange={(checked) => 
              onSettingChange('multimodalSupport', { 
                ...multimodalSupport, 
                images: checked 
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="voiceSupport" className="text-white/90">Voice Interaction</Label>
            <p className="text-sm text-white/60">
              Enable voice input and speech synthesis
            </p>
          </div>
          <Switch
            id="voiceSupport"
            checked={multimodalSupport.voice}
            onCheckedChange={(checked) => 
              onSettingChange('multimodalSupport', { 
                ...multimodalSupport, 
                voice: checked 
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="videoSupport" className="text-white/90">Video Processing</Label>
            <p className="text-sm text-white/60">
              Allow AI to analyze and interact with video content
            </p>
          </div>
          <Switch
            id="videoSupport"
            checked={multimodalSupport.video}
            onCheckedChange={(checked) => 
              onSettingChange('multimodalSupport', { 
                ...multimodalSupport, 
                video: checked 
              })
            }
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="voiceEnabled" className="text-white/90">Text-to-Speech</Label>
            <p className="text-sm text-white/60">
              Enable AI responses via speech synthesis
            </p>
          </div>
          <Switch
            id="voiceEnabled"
            checked={voiceSettings.enabled}
            onCheckedChange={(checked) => 
              onSettingChange('voiceSettings', { 
                ...voiceSettings, 
                enabled: checked 
              })
            }
          />
        </div>

        {voiceSettings.enabled && (
          <>
            <div className="space-y-2">
              <Label htmlFor="language" className="text-white/90">Voice Language</Label>
              <Select
                value={voiceSettings.language}
                onValueChange={(value) => 
                  onSettingChange('voiceSettings', { 
                    ...voiceSettings, 
                    language: value 
                  })
                }
              >
                <SelectTrigger className="w-full bg-[#1A1F2C] border-white/10">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                  <SelectItem value="es-ES">Spanish</SelectItem>
                  <SelectItem value="fr-FR">French</SelectItem>
                  <SelectItem value="de-DE">German</SelectItem>
                  <SelectItem value="nl-NL">Dutch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voice" className="text-white/90">Voice Type</Label>
              <Select
                value={voiceSettings.voice}
                onValueChange={(value) => 
                  onSettingChange('voiceSettings', { 
                    ...voiceSettings, 
                    voice: value 
                  })
                }
              >
                <SelectTrigger className="w-full bg-[#1A1F2C] border-white/10">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="enhanced">Enhanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

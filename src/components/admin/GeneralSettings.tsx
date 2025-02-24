
import { BotSettings } from "@/components/BotSettings";
import { QuickActionsSettings } from "@/components/QuickActionsSettings";
import { FileUpload } from "@/components/FileUpload";

export const GeneralSettings = () => {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Bot Name & Branding</h2>
        <p className="text-gray-600">Customize Archibot's appearance and initial settings.</p>
        <BotSettings />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Conversation Starters</h2>
        <p className="text-gray-600">Configure quick action buttons that appear at the start of each conversation.</p>
        <QuickActionsSettings />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Response Training</h2>
        <p className="text-gray-600">Upload training files to improve Archibot's knowledge.</p>
        <FileUpload />
      </section>
    </div>
  );
};

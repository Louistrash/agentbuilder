
import { ChatBehaviorSettings } from "@/components/ChatBehaviorSettings";

export const ChatSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Chat Behavior & AI Responses</h2>
      <p className="text-gray-600">Configure how Archibot interacts with users.</p>
      <ChatBehaviorSettings />
    </div>
  );
};


import { Input } from "@/components/ui/input";

interface ChatLimitsSectionProps {
  maxMessagesPerChat: string;
  responseDelay: string;
  onSettingChange: (key: string, value: string) => void;
}

export const ChatLimitsSection = ({
  maxMessagesPerChat,
  responseDelay,
  onSettingChange,
}: ChatLimitsSectionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Chat Limits & Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="maxMessages" className="text-sm font-medium">
            Maximum Messages per Chat
          </label>
          <Input
            id="maxMessages"
            type="number"
            value={maxMessagesPerChat}
            onChange={(e) => onSettingChange('maxMessagesPerChat', e.target.value)}
            min="1"
            max="100"
          />
          <p className="text-sm text-gray-500">
            Limit the number of messages in a single chat session
          </p>
        </div>
        <div className="space-y-2">
          <label htmlFor="responseDelay" className="text-sm font-medium">
            Response Delay (ms)
          </label>
          <Input
            id="responseDelay"
            type="number"
            value={responseDelay}
            onChange={(e) => onSettingChange('responseDelay', e.target.value)}
            min="0"
            max="2000"
          />
          <p className="text-sm text-gray-500">
            Add a slight delay before showing AI responses
          </p>
        </div>
      </div>
    </section>
  );
};

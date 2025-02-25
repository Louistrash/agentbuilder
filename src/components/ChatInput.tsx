
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Image, Video, StopCircle } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string | File, type?: 'text' | 'image' | 'video' | 'voice') => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message, 'text');
      setMessage("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.type.startsWith('image/') ? 'image' : 'video';
    const previewUrl = URL.createObjectURL(file);
    setMediaPreview(previewUrl);

    onSend(file, fileType);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setMediaPreview(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onSend(audioBlob, 'voice');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="file"
        accept="image/*,video/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-500 hover:text-gray-700"
        >
          <Image className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-500 hover:text-gray-700"
        >
          <Video className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={isRecording ? stopRecording : startRecording}
          className={`text-gray-500 hover:text-gray-700 ${isRecording ? 'text-red-500 hover:text-red-700' : ''}`}
        >
          {isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
      </div>

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-white border-[#E5E7EB] rounded-full text-[15px] px-4 py-3 focus:ring-0 focus:border-[#E5E7EB] placeholder:text-gray-500 text-gray-800"
      />
      <Button
        type="submit"
        size="icon"
        className="bg-[#18344A] hover:bg-[#18344A]/90 rounded-full w-10 h-10 flex items-center justify-center"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

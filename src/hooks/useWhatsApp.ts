
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useWhatsApp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (phoneNumber: string, message: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('whatsapp', {
        body: { phoneNumber, message }
      });

      if (error) throw error;

      toast({
        title: "Message Sent",
        description: "WhatsApp message sent successfully",
      });

      return data;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      toast({
        title: "Error",
        description: "Failed to send WhatsApp message. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading
  };
};

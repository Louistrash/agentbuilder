
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

export const FileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['text/plain', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Alleen .txt en .pdf bestanden zijn toegestaan.",
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Bestand mag niet groter zijn dan 10MB.",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Niet ingelogd');

      const response = await supabase.functions.invoke('upload-training', {
        body: formData,
      });

      if (response.error) throw response.error;

      toast({
        title: "Succes",
        description: "Bestand is succesvol geüpload.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Er is een fout opgetreden bij het uploaden van het bestand.",
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-4 border-t border-luxury-100">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="file"
          accept=".txt,.pdf"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="hidden"
        />
        <Button
          variant="outline"
          disabled={isUploading}
          className="bg-luxury-50 hover:bg-luxury-100 text-luxury-900 border-luxury-200"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isUploading ? "Bezig met uploaden..." : "Training bestand uploaden"}
        </Button>
      </label>
    </div>
  );
};


import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WebsiteTraining {
  id: string;
  url: string;
  status: string;
  word_count: number;
  error_message?: string;
  created_at: string;
}

export const WebTrainingList = () => {
  const [websites, setWebsites] = useState<WebsiteTraining[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWebsites();
    // Set up real-time subscription
    const channel = supabase
      .channel('website_training_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'website_training_sources' 
        }, 
        () => {
          fetchWebsites();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchWebsites = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('website_training_sources')
        .select('*')
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWebsites(data || []);
    } catch (error) {
      console.error('Error fetching websites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (websites.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-500">
        No websites have been added for training yet.
      </Card>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>URL</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Words</TableHead>
          <TableHead>Added</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {websites.map((website) => (
          <TableRow key={website.id}>
            <TableCell className="font-medium">{website.url}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getStatusIcon(website.status)}
                <span className="capitalize">{website.status}</span>
              </div>
              {website.error_message && (
                <p className="text-sm text-red-500 mt-1">{website.error_message}</p>
              )}
            </TableCell>
            <TableCell>{website.word_count?.toLocaleString() || '-'}</TableCell>
            <TableCell>
              {new Date(website.created_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

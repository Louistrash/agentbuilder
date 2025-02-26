
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export const TopQueriesTable = () => {
  const { data: queries, isLoading } = useQuery({
    queryKey: ['top-queries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_queries')
        .select('*')
        .order('frequency', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching top queries:', error);
        throw error;
      }

      return data.map(query => ({
        query: query.query_text,
        count: query.frequency,
        avgResponseTime: `${(query.avg_response_time_ms / 1000).toFixed(1)}s`
      }));
    }
  });

  if (isLoading) {
    return (
      <Card className="bg-[#1A1F2C] border-[#30363D] p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Top User Queries</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-[#222939] rounded" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1A1F2C] border-[#30363D] p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Top User Queries</h3>
      <Table>
        <TableHeader>
          <TableRow className="border-[#30363D] hover:bg-[#222939]">
            <TableHead className="text-gray-400">Query</TableHead>
            <TableHead className="text-right text-gray-400">Frequency</TableHead>
            <TableHead className="text-right text-gray-400">Avg. Response Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queries?.map((item) => (
            <TableRow key={item.query} className="border-[#30363D] hover:bg-[#222939]">
              <TableCell className="font-medium text-white">{item.query}</TableCell>
              <TableCell className="text-right text-gray-300">{item.count}</TableCell>
              <TableCell className="text-right text-gray-300">{item.avgResponseTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

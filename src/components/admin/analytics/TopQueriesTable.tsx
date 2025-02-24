
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
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top User Queries</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Top User Queries</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Query</TableHead>
            <TableHead className="text-right">Frequency</TableHead>
            <TableHead className="text-right">Avg. Response Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queries?.map((item) => (
            <TableRow key={item.query}>
              <TableCell className="font-medium">{item.query}</TableCell>
              <TableCell className="text-right">{item.count}</TableCell>
              <TableCell className="text-right">{item.avgResponseTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const MOCK_DATA = [
  { query: "What are your mattress sizes?", count: 245, avgResponseTime: "2.1s" },
  { query: "Do you offer free delivery?", count: 189, avgResponseTime: "1.8s" },
  { query: "What's your return policy?", count: 156, avgResponseTime: "2.3s" },
  { query: "How long is the warranty?", count: 134, avgResponseTime: "1.9s" },
  { query: "Do you have financing options?", count: 98, avgResponseTime: "2.4s" }
];

export const TopQueriesTable = () => {
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
          {MOCK_DATA.map((item) => (
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

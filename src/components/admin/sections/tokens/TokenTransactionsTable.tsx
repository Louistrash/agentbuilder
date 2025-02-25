
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TokenTransaction } from "./types";

interface TokenTransactionsTableProps {
  transactions: TokenTransaction[];
}

export const TokenTransactionsTable = ({ transactions }: TokenTransactionsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Date</TableHead>
                  <TableHead className="whitespace-nowrap">User ID</TableHead>
                  <TableHead className="whitespace-nowrap">Type</TableHead>
                  <TableHead className="whitespace-nowrap">Amount</TableHead>
                  <TableHead className="whitespace-nowrap">Description</TableHead>
                  <TableHead className="whitespace-nowrap">Feature</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-mono text-sm whitespace-nowrap">
                      {transaction.profile_id}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className={
                        transaction.transaction_type === 'credit' 
                          ? 'text-green-500' 
                          : 'text-red-500'
                      }>
                        {transaction.transaction_type}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{transaction.amount}</TableCell>
                    <TableCell className="whitespace-nowrap">{transaction.description}</TableCell>
                    <TableCell className="whitespace-nowrap">{transaction.feature_used || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

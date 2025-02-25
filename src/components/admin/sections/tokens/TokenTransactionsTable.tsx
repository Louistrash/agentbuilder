
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Feature</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {transaction.profile_id}
                </TableCell>
                <TableCell>
                  <span className={
                    transaction.transaction_type === 'credit' 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }>
                    {transaction.transaction_type}
                  </span>
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.feature_used || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

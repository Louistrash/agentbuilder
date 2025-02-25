
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  token: string;
  onTokenChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  inputLabel: string;
  inputDescription: string;
  inputPlaceholder: string;
}

export const IntegrationCard = ({
  title,
  description,
  icon: Icon,
  token,
  onTokenChange,
  onSubmit,
  isLoading,
  inputLabel,
  inputDescription,
  inputPlaceholder,
}: IntegrationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }} className="space-y-4">
          <div>
            <label htmlFor={title.toLowerCase()} className="text-sm font-medium">
              {inputLabel}
            </label>
            <Input
              id={title.toLowerCase()}
              placeholder={inputPlaceholder}
              value={token}
              onChange={(e) => onTokenChange(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              {inputDescription}
            </p>
          </div>
          <Button type="submit" disabled={isLoading || !token}>
            {isLoading ? "Saving..." : "Save & Test Connection"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

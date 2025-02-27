
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function AddonLoadingState() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Card key={i} className="bg-[#1C2128] border-[#30363D] h-[220px] animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-gray-700"></div>
              <div className="h-5 w-3/4 bg-gray-700 rounded"></div>
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

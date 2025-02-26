
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryFilterProps } from "./types";

export const CategoryFilter = ({ selectedCategory, setSelectedCategory, categories }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      <Filter className="h-4 w-4 mt-2" />
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
    </div>
  );
};

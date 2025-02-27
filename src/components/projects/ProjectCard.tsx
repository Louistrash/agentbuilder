
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Folder, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  is_active: boolean | null;
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string, description: string) => void;
}

export const ProjectCard = ({ project, onDelete, onEdit }: ProjectCardProps) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);
  const [editDescription, setEditDescription] = useState(project.description || '');

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditName(project.name);
    setEditDescription(project.description || '');
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!editName.trim()) return;
    onEdit(project.id, editName, editDescription);
    setIsEditing(false);
  };

  return (
    <Card className="bg-[#1C2128] border-[#30363D] hover:border-[#1EAEDB]/50 transition-all">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        {isEditing ? (
          <div className="space-y-2 w-full">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-2 py-1 bg-[#1A1F2C] border border-[#30363D] rounded text-white"
              placeholder="Project name"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-2 py-1 bg-[#1A1F2C] border border-[#30363D] rounded text-white"
              placeholder="Project description"
              rows={2}
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSaveEdit}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleCancelEditing}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div 
              className="flex-1 cursor-pointer" 
              onClick={() => navigate(`/agent-builder/free?project=${project.id}`)}
            >
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-[#1EAEDB]" />
                {project.name}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {project.description}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                  >
                    <path
                      d="M2 5h11M2 10h11"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={handleStartEditing}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(project.id)}
                  className="text-red-500 focus:text-red-500"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400">
          Created {new Date(project.created_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

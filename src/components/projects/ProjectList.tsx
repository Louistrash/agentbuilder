
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Folder, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "./ProjectCard";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  is_active: boolean | null;
}

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  sortOrder: 'asc' | 'desc';
  onToggleSort: () => void;
  onCreateProject: () => void;
  onDeleteProject: (id: string) => void;
  onEditProject: (id: string, name: string, description: string) => void;
}

export const ProjectList = ({
  projects,
  isLoading,
  sortOrder,
  onToggleSort,
  onCreateProject,
  onDeleteProject,
  onEditProject
}: ProjectListProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  if (projects.length === 0) {
    return (
      <Card className="bg-[#1C2128] border-[#30363D] p-8">
        <div className="text-center">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
          <p className="text-gray-400 mb-4">
            Create your first project to get started with AI agents.
          </p>
          <Button
            onClick={onCreateProject}
            className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Project
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Your Projects</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSort}
            className="text-gray-400 hover:text-white"
          >
            <SortAsc className="h-5 w-5" />
          </Button>
        </div>
        <Button
          onClick={onCreateProject}
          className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={onDeleteProject}
            onEdit={onEditProject}
          />
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-[#1C2128] border border-[#30363D] rounded-lg">
        <p className="text-sm text-gray-400">
          Free users can create up to 2 projects. 
          {projects.length >= 2 && (
            <span className="ml-1">
              You've reached your project limit. 
              <Button
                variant="link"
                className="text-[#1EAEDB] hover:text-[#1EAEDB]/90 p-0 h-auto font-normal"
                onClick={() => navigate('/pricing')}
              >
                Upgrade to create more
              </Button>
            </span>
          )}
        </p>
      </div>
    </>
  );
};

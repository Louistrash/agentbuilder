import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Brain, Zap, BarChart3, Folder, Pencil, Trash2, Check, X, SortAsc } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FeatureCard } from "@/components/home/FeatureCard";
import { ProFeatures } from "@/components/home/ProFeatures";
import { FeatureOnboarding } from "@/components/agent-builder/FeatureOnboarding";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
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

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchLogo();
    fetchProjects();
    setTimeout(() => setShowWelcome(true), 100);
  }, [user]);

  const fetchLogo = async () => {
    try {
      const { data, error } = await supabase
        .from('bot_settings')
        .select('logo_url')
        .single();
      if (error) throw error;
      setLogoUrl(data?.logo_url);
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  const fetchProjects = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: sortOrder === 'asc' });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a project",
        variant: "destructive",
      });
      return;
    }

    if (projects.length >= 2) {
      toast({
        title: "Project Limit Reached",
        description: "Free users can only create up to 2 projects. Upgrade to create more!",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            name: `New Project ${projects.length + 1}`,
            profile_id: user.id,
            description: "A new AI agent project",
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project created successfully",
      });

      navigate(`/agent-builder/free?project=${data.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectId));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleEditProject = async (projectId: string) => {
    if (!editName.trim()) return;

    try {
      const { error } = await supabase
        .from('projects')
        .update({
          name: editName,
          description: editDescription,
        })
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.map(p => 
        p.id === projectId 
          ? { ...p, name: editName, description: editDescription }
          : p
      ));
      
      setEditingProject(null);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  };

  const startEditing = (project: Project) => {
    setEditingProject(project.id);
    setEditName(project.name);
    setEditDescription(project.description || '');
  };

  const cancelEditing = () => {
    setEditingProject(null);
    setEditName('');
    setEditDescription('');
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setProjects([...projects].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return newOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }));
  };

  const handleFeatureClick = (feature: string) => {
    setClickedCard(feature);
    setSelectedFeature(feature);
    setShowOnboarding(true);
  };

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    navigate('/agents', { state: { feature: selectedFeature } });
  };

  const features = [
    {
      id: 'build',
      title: 'Easy to Build',
      description: 'Create custom chat agents with our intuitive builder interface. No coding required.',
      demoContent: 'Try our drag-and-drop interface and see how easy it is to create your first AI agent.',
      icon: <Brain className="h-6 w-6 text-[#8B5CF6] filter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#8B5CF6]/5 to-transparent',
      bgColor: 'bg-black/20'
    },
    {
      id: 'smart',
      title: 'Smart Responses',
      description: 'Leverage advanced AI to provide intelligent and contextual responses to user queries.',
      demoContent: 'Experience real-time AI responses powered by cutting-edge language models.',
      icon: <Zap className="h-6 w-6 text-[#D946EF] filter drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#D946EF]/5 to-transparent',
      bgColor: 'bg-black/20'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'Track performance and gather insights to continuously improve your chat agents.',
      demoContent: 'View sample analytics and see how you can optimize your chat agents.',
      icon: <BarChart3 className="h-6 w-6 text-[#0EA5E9] filter drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#0EA5E9]/5 to-transparent',
      bgColor: 'bg-black/20'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white overflow-x-hidden">
      <Header logoUrl={logoUrl} />

      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          {user ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold">Your Projects</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleSortOrder}
                      className="text-gray-400 hover:text-white"
                    >
                      <SortAsc className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button
                    onClick={handleCreateProject}
                    className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </div>
                
                {isLoading ? (
                  <div className="text-center py-8">Loading projects...</div>
                ) : projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <Card 
                        key={project.id}
                        className="bg-[#1C2128] border-[#30363D] hover:border-[#1EAEDB]/50 transition-all"
                      >
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                          {editingProject === project.id ? (
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
                                  onClick={() => handleEditProject(project.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={cancelEditing}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex-1" onClick={() => navigate(`/agent-builder/free?project=${project.id}`)}>
                                <CardTitle className="flex items-center gap-2 cursor-pointer">
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
                                  <DropdownMenuItem onClick={() => startEditing(project)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteProject(project.id)}
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
                    ))}
                  </div>
                ) : (
                  <Card className="bg-[#1C2128] border-[#30363D] p-8">
                    <div className="text-center">
                      <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
                      <p className="text-gray-400 mb-4">
                        Create your first project to get started with AI agents.
                      </p>
                      <Button
                        onClick={handleCreateProject}
                        className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Project
                      </Button>
                    </div>
                  </Card>
                )}
                
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
              </div>
            </>
          ) : (
            <div className="text-center mb-8 sm:mb-12 animate-fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-[#1EAEDB] via-white to-[#1EAEDB]/70 bg-clip-text text-transparent">
                Create Intelligent Chat Agents
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-6">
                Sign in to create and manage your AI chat agents. Free users can create up to 2 projects!
              </p>
              <Button
                size="default"
                onClick={() => navigate('/auth')}
                className="w-full max-w-md mx-auto bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white transition-all duration-300 h-12 rounded-xl font-medium text-base shadow-lg shadow-[#1EAEDB]/25 transform hover:scale-[1.02]"
              >
                <Plus className="h-5 w-5 mr-2" />
                Sign In to Get Started
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature.id}
                title={feature.title}
                description={feature.description}
                demoContent={feature.demoContent}
                icon={feature.icon}
                onClick={() => handleFeatureClick(feature.id)}
                isHovered={hoveredCard === feature.id}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                isClicked={clickedCard === feature.id}
                gradientClasses={feature.gradientClasses}
                bgColor={feature.bgColor}
              />
            ))}
          </div>

          <ProFeatures />
        </div>
      </main>

      <FeatureOnboarding
        feature={selectedFeature}
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
      />
    </div>
  );
};

export default Index;

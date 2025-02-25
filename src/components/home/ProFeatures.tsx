
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WidgetCode } from "@/components/agent-builder/WidgetCode";

export function ProFeatures() {
  const navigate = useNavigate();

  return (
    <div className="mt-24 text-center">
      <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm font-medium mb-4">
        Pro Features
      </div>
      <h3 className="text-2xl font-bold mb-4">
        Advanced Integration Options
      </h3>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
        Take your chat agents to the next level with our professional integration options.
      </p>
      <Card className="p-8 bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="text-left">
            <h4 className="text-xl font-semibold mb-4">
              Embed Anywhere
            </h4>
            <p className="text-gray-400 mb-6">
              Integrate your chat agents seamlessly into any website or application with our
              widget or shortcode options.
            </p>
            <Button 
              onClick={() => navigate('/agents?pro=true')}
              className="bg-white text-gray-900 hover:bg-gray-200"
            >
              <Code className="h-4 w-4 mr-2" />
              Create Agent to Get Code
            </Button>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
            <WidgetCode agentId="demo-agent" />
          </div>
        </div>
      </Card>
    </div>
  );
}

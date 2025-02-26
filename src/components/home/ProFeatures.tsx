
import { MessageSquare, BarChart2, Wifi, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProFeatures() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-1 bg-[#0EA5E9]/10 rounded-full text-sm font-medium text-[#0EA5E9] mb-4">
          Pro Features
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">
          Unlock Advanced Capabilities
        </h2>
        <p className="text-gray-400 mt-2">
          Take your chat agents to the next level with our professional features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-black/20 rounded-xl p-6 border border-[#8B5CF6]/10 backdrop-blur-sm">
          <div className="h-12 w-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-[#8B5CF6] filter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Advanced Chat Features</h3>
          <p className="text-gray-400 text-sm">
            Multi-turn conversations, context awareness, and customizable personalities
          </p>
        </div>

        <div className="bg-black/20 rounded-xl p-6 border border-[#D946EF]/10 backdrop-blur-sm">
          <div className="h-12 w-12 rounded-lg bg-[#D946EF]/10 flex items-center justify-center mb-4">
            <BarChart2 className="h-6 w-6 text-[#D946EF] filter drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Detailed Analytics</h3>
          <p className="text-gray-400 text-sm">
            Track user engagement, conversation metrics, and performance insights
          </p>
        </div>

        <div className="bg-black/20 rounded-xl p-6 border border-[#0EA5E9]/10 backdrop-blur-sm">
          <div className="h-12 w-12 rounded-lg bg-[#0EA5E9]/10 flex items-center justify-center mb-4">
            <Code2 className="h-6 w-6 text-[#0EA5E9] filter drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">API Integration</h3>
          <p className="text-gray-400 text-sm">
            Seamlessly integrate with your existing systems via our REST API
          </p>
        </div>

        <div className="bg-black/20 rounded-xl p-6 border border-[#8B5CF6]/10 backdrop-blur-sm">
          <div className="h-12 w-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mb-4">
            <Wifi className="h-6 w-6 text-[#8B5CF6] filter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Multi-Channel Support</h3>
          <p className="text-gray-400 text-sm">
            Deploy across web, mobile, and messaging platforms
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-[#8B5CF6]/25"
        >
          Upgrade to Pro
        </Button>
      </div>
    </section>
  );
}

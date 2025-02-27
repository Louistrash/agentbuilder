
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useTokens } from "@/context/TokenContext";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, UserPlus, ShoppingBag, Share2, Calendar, MessageSquare, Heart, Languages, Paintbrush, Type, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddonPreviewDialog } from "./AddonPreviewDialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenPurchaseDialog } from "@/components/tokens/TokenPurchaseDialog";

// Define types
export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'automation' | 'communication' | 'customization' | 'analytics' | 'integration';
  icon_name: string;
  features: string[];
  is_premium: boolean;
  status: string;
}

interface PurchasedAddon {
  id: string;
  addon_id: string;
  profile_id: string;
  agent_id: string | null;
  status: string;
  purchased_at: string;
  activated_at: string | null;
}

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  'UserPlus': <UserPlus className="h-6 w-6" />,
  'ShoppingBag': <ShoppingBag className="h-6 w-6" />,
  'Share2': <Share2 className="h-6 w-6" />,
  'Calendar': <Calendar className="h-6 w-6" />,
  'MessageSquare': <MessageSquare className="h-6 w-6" />,
  'Heart': <Heart className="h-6 w-6" />,
  'Languages': <Languages className="h-6 w-6" />,
  'Paintbrush': <Paintbrush className="h-6 w-6" />,
  'Type': <Type className="h-6 w-6" />,
  'Users': <Users className="h-6 w-6" />,
};

// Color mapping for categories
const categoryColors: Record<string, string> = {
  'automation': 'bg-blue-500/10 text-blue-500',
  'communication': 'bg-green-500/10 text-green-500',
  'customization': 'bg-purple-500/10 text-purple-500',
  'analytics': 'bg-orange-500/10 text-orange-500',
  'integration': 'bg-pink-500/10 text-pink-500',
};

// Text color mapping for buttons
const categoryTextColors: Record<string, string> = {
  'automation': 'text-blue-400',
  'communication': 'text-green-400',
  'customization': 'text-purple-400',
  'analytics': 'text-orange-400',
  'integration': 'text-pink-400',
};

export function AddonsMarketplace() {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [purchasedAddons, setPurchasedAddons] = useState<PurchasedAddon[]>([]);
  const [selectedAddon, setSelectedAddon] = useState<Addon | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { tokens, useTokens: spendTokens, refreshTokens } = useTokens();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddons();
    fetchPurchasedAddons();
  }, []);

  const fetchAddons = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('marketplace_addons')
        .select('*')
        .eq('status', 'active');
      
      if (error) throw error;
      
      setAddons(data as Addon[]);
    } catch (error) {
      console.error('Error fetching addons:', error);
      toast({
        title: 'Error',
        description: 'Failed to load addons. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPurchasedAddons = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('purchased_addons')
        .select('*')
        .eq('profile_id', user.id);
      
      if (error) throw error;
      
      setPurchasedAddons(data as PurchasedAddon[]);
    } catch (error) {
      console.error('Error fetching purchased addons:', error);
    }
  };

  const handlePurchaseAddon = async (addon: Addon) => {
    try {
      // Check if already purchased
      if (isPurchased(addon.id)) {
        toast({
          title: 'Already Purchased',
          description: 'You already own this add-on.',
        });
        return;
      }

      // Check if enough tokens
      if (tokens < addon.price) {
        setPurchaseMessage(`You need ${addon.price} tokens to purchase this add-on, but you only have ${tokens} tokens.`);
        setIsTokenDialogOpen(true);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to purchase add-ons.',
          variant: 'destructive',
        });
        return;
      }

      // Spend tokens
      const success = await spendTokens(addon.price, 'addon_purchase');
      if (!success) {
        toast({
          title: 'Token Error',
          description: 'There was an issue with your tokens. Please try again.',
          variant: 'destructive',
        });
        return;
      }

      // Record the purchase
      const { error } = await supabase
        .from('purchased_addons')
        .insert({
          profile_id: user.id,
          addon_id: addon.id,
          status: 'active',
          purchased_at: new Date().toISOString(),
        });

      if (error) throw error;

      await refreshTokens();
      await fetchPurchasedAddons();

      toast({
        title: 'Add-on Purchased',
        description: `${addon.name} has been added to your account!`,
      });
    } catch (error) {
      console.error('Error purchasing addon:', error);
      toast({
        title: 'Purchase Failed',
        description: 'There was an error processing your purchase. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const isPurchased = (addonId: string) => {
    return purchasedAddons.some(item => item.addon_id === addonId);
  };

  const handleOpenPreview = (addon: Addon) => {
    setSelectedAddon(addon);
    setIsPreviewOpen(true);
  };

  const filteredAddons = addons.filter(addon => {
    const matchesSearch = addon.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           addon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? addon.category === selectedCategory : true;
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'purchased' && isPurchased(addon.id));
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const categories = Array.from(new Set(addons.map(addon => addon.category)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search add-ons..."
            className="pl-8 bg-[#1C2128] border-[#30363D] text-white w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto py-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-gray-400 min-w-[16px]" />
          <Button
            key="all"
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={`min-w-[70px] rounded-md ${
              selectedCategory === null 
                ? 'bg-[#222222] hover:bg-[#333333] text-[#1EAEDB] font-medium' 
                : 'bg-transparent text-gray-300 hover:bg-[#222222] hover:text-[#1EAEDB] border-[#30363D]'
            }`}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`min-w-[100px] rounded-md ${
                selectedCategory === category 
                  ? `bg-[#222222] hover:bg-[#333333] ${categoryTextColors[category]} font-medium` 
                  : `bg-transparent text-gray-300 hover:bg-[#222222] hover:${categoryTextColors[category]} border-[#30363D]`
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-[#161B22] border border-[#30363D] rounded-md p-1 inline-flex">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'all' ? 'bg-[#1C2128] text-white' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('all')}
        >
          All Add-ons
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'purchased' ? 'bg-[#1C2128] text-white' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('purchased')}
        >
          Purchased
        </button>
      </div>
      
      <div className="mt-6">
        {isLoading ? (
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
        ) : activeTab === 'all' && filteredAddons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAddons.map((addon) => (
              <Card
                key={addon.id}
                className={`bg-[#1C2128] border-[#30363D] hover:border-[#1EAEDB]/50 transition-colors ${
                  isPurchased(addon.id) ? 'ring-1 ring-green-500' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-lg ${categoryColors[addon.category]} w-fit`}>
                        {iconMap[addon.icon_name]}
                      </div>
                      <Badge variant={isPurchased(addon.id) ? "success" : "outline"} className={`ml-auto ${!isPurchased(addon.id) ? "bg-[#1A1F2C] border-[#1EAEDB]/20 text-[#1EAEDB] font-medium" : ""}`}>
                        {isPurchased(addon.id) ? 'Purchased' : `${addon.price} tokens`}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-white text-lg">{addon.name}</h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{addon.description}</p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenPreview(addon)}
                        className="text-white border-[#30363D] bg-[#222222] hover:bg-[#333333] rounded-md"
                      >
                        Details
                      </Button>
                      <Button
                        size="sm"
                        disabled={isPurchased(addon.id)}
                        onClick={() => !isPurchased(addon.id) && handlePurchaseAddon(addon)}
                        className={`rounded-md ${isPurchased(addon.id) ? 'bg-green-600 hover:bg-green-600' : 'bg-[#00b8d9] hover:bg-[#00a3c4] text-white'}`}
                      >
                        {isPurchased(addon.id) ? 'Owned' : 'Purchase'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : activeTab === 'purchased' && purchasedAddons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {purchasedAddons.map((purchased) => {
              const addon = addons.find(a => a.id === purchased.addon_id);
              if (!addon) return null;
              
              return (
                <Card
                  key={purchased.id}
                  className="bg-[#1C2128] border-[#30363D] hover:border-[#1EAEDB]/50 transition-colors cursor-pointer ring-1 ring-green-500"
                  onClick={() => handleOpenPreview(addon)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className={`p-3 rounded-lg ${categoryColors[addon.category]} w-fit`}>
                          {iconMap[addon.icon_name]}
                        </div>
                        <Badge variant="success" className="ml-auto">Active</Badge>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-white text-lg">{addon.name}</h3>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{addon.description}</p>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-xs text-gray-500">Purchased on {new Date(purchased.purchased_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-[#1C2128] border border-[#30363D] rounded-xl p-8 inline-block">
              {activeTab === 'all' ? (
                <>
                  <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-200">No add-ons found</h3>
                  <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-200">No purchased add-ons</h3>
                  <p className="text-gray-400 mt-2">Browse the marketplace to enhance your agents</p>
                  <Button 
                    className="mt-4 bg-[#222222] hover:bg-[#333333] text-white rounded-md"
                    onClick={() => setActiveTab('all')}
                  >
                    Explore Add-ons
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedAddon && (
        <AddonPreviewDialog
          addon={selectedAddon}
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onPurchase={handlePurchaseAddon}
          isPurchased={isPurchased(selectedAddon.id)}
          userTokens={tokens}
        />
      )}

      <TokenPurchaseDialog
        open={isTokenDialogOpen}
        onClose={() => setIsTokenDialogOpen(false)}
        message={purchaseMessage}
      />
    </div>
  );
}

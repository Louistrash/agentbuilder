
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useTokens } from "@/context/TokenContext";
import { useToast } from "@/hooks/use-toast";
import { AddonSearchAndFilter } from './AddonSearchAndFilter';
import { AddonTabs } from './AddonTabs';
import { AddonCard } from './AddonCard';
import { PurchasedAddonCard } from './PurchasedAddonCard';
import { AddonEmptyState } from './AddonEmptyState';
import { AddonLoadingState } from './AddonLoadingState';
import { AddonPreviewDialog } from "./AddonPreviewDialog";
import { TokenPurchaseDialog } from "@/components/tokens/TokenPurchaseDialog";
import { fetchAddons, fetchPurchasedAddons, purchaseAddon } from "./addonService";
import { Addon, PurchasedAddon } from './types';

// Change from 'export { Addon }' to 'export type { Addon }'
export type { Addon } from './types';

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
  const [showAddonHighlight, setShowAddonHighlight] = useState(false);

  const { tokens, useTokens: spendTokens, refreshTokens, displayTokens } = useTokens();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);
  
  // Add an effect to highlight addons when tokens change
  useEffect(() => {
    if (displayTokens > 0 && !isLoading) {
      setShowAddonHighlight(true);
      const timer = setTimeout(() => setShowAddonHighlight(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [displayTokens, isLoading]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [addonsData, purchasedData] = await Promise.all([
        fetchAddons(),
        fetchPurchasedAddons()
      ]);
      
      setAddons(addonsData);
      setPurchasedAddons(purchasedData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load addons. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
      await purchaseAddon(addon, user.id);

      await refreshTokens();
      await loadData();

      toast({
        title: 'Add-on Purchased',
        description: `${addon.name} has been added to your account!`,
      });
      
      // Close the dialog
      setIsPreviewOpen(false);
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
      <AddonSearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <AddonTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="mt-6">
        {isLoading ? (
          <AddonLoadingState />
        ) : activeTab === 'all' && filteredAddons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAddons.map((addon) => (
              <AddonCard
                key={addon.id}
                addon={addon}
                isPurchased={isPurchased(addon.id)}
                showAddonHighlight={showAddonHighlight}
                tokens={tokens}
                onOpenPreview={handleOpenPreview}
              />
            ))}
          </div>
        ) : activeTab === 'purchased' && purchasedAddons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {purchasedAddons.map((purchased) => {
              const addon = addons.find(a => a.id === purchased.addon_id);
              if (!addon) return null;
              
              return (
                <PurchasedAddonCard
                  key={purchased.id}
                  purchasedAddon={purchased}
                  addon={addon}
                  onOpenPreview={handleOpenPreview}
                />
              );
            })}
          </div>
        ) : (
          <AddonEmptyState
            activeTab={activeTab}
            onExplore={() => setActiveTab('all')}
          />
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
        showAddons={true}
      />
    </div>
  );
}

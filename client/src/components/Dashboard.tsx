import { useState, useMemo } from 'react';
import { useSweets, usePurchaseSweet } from '../hooks/useSweets';
import { SweetCard } from './SweetCard';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from './ui/toast';

export const Dashboard = () => {
  const { data: sweets = [], isLoading, error, refetch } = useSweets();
  const purchaseMutation = usePurchaseSweet();
  const { toasts, showToast, removeToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSweets = useMemo(() => {
    if (!searchQuery.trim()) return sweets;
    
    const query = searchQuery.toLowerCase();
    return sweets.filter(
      (sweet) =>
        sweet.name.toLowerCase().includes(query) ||
        sweet.category.toLowerCase().includes(query)
    );
  }, [sweets, searchQuery]);

  const handlePurchase = async (id: string) => {
    try {
      await purchaseMutation.mutateAsync({ id, quantity: 1 });
      const sweet = sweets.find((s) => s.id === id);
      showToast(`Successfully purchased ${sweet?.name || 'sweet'}!`, 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to purchase sweet';
      showToast(errorMessage, 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading delicious sweets... 🍬</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <span className="text-6xl mb-4 block">😢</span>
          <p className="text-white text-lg mb-4 font-semibold">
            {error instanceof Error ? error.message : 'Error loading sweets. Please try again.'}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 font-semibold shadow-lg transition-all transform hover:scale-105"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="space-y-8">
        {/* Search Bar */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
                <input
                  type="text"
                  placeholder="Search sweets by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/90 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-inner"
                />
              </div>
            </div>
            {sweets.length > 0 && (
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg">
                <span className="text-2xl mr-2">🍭</span>
                {filteredSweets.length} of {sweets.length} sweets
              </div>
            )}
          </div>
        </div>

        {/* Grid Layout */}
        {filteredSweets.length === 0 ? (
          <div className="text-center py-16 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl">
            <span className="text-8xl mb-4 block">🍬</span>
            <p className="text-white text-2xl font-bold mb-4">
              {searchQuery ? 'No sweets found matching your search.' : 'No sweets available.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 font-semibold transition-all backdrop-blur-sm"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                onPurchase={handlePurchase}
                isPurchasing={purchaseMutation.isPending}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};


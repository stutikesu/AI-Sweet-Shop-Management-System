// Sweet emoji/icons mapping for different categories
export const getSweetEmoji = (category: string, name: string): string => {
  const categoryLower = category.toLowerCase();
  const nameLower = name.toLowerCase();

  // Category-based emojis
  if (categoryLower.includes('chocolate')) return '🍫';
  if (categoryLower.includes('gumm') || categoryLower.includes('jelly')) return '🍬';
  if (categoryLower.includes('hard')) return '🍭';
  if (categoryLower.includes('caramel')) return '🍯';
  if (categoryLower.includes('soft') || categoryLower.includes('marshmallow')) return '🍡';
  if (categoryLower.includes('licorice')) return '🖤';

  // Name-based fallback
  if (nameLower.includes('chocolate')) return '🍫';
  if (nameLower.includes('gummy') || nameLower.includes('bear')) return '🍬';
  if (nameLower.includes('lollipop')) return '🍭';
  if (nameLower.includes('caramel')) return '🍯';
  if (nameLower.includes('marshmallow')) return '🍡';
  if (nameLower.includes('jelly') || nameLower.includes('bean')) return '🍬';
  if (nameLower.includes('rock')) return '💎';
  if (nameLower.includes('licorice')) return '🖤';

  // Default
  return '🍬';
};

export const getCategoryColor = (category: string): string => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('chocolate')) return 'from-amber-600 to-amber-800';
  if (categoryLower.includes('gumm') || categoryLower.includes('jelly')) return 'from-pink-400 to-pink-600';
  if (categoryLower.includes('hard')) return 'from-blue-400 to-blue-600';
  if (categoryLower.includes('caramel')) return 'from-orange-500 to-orange-700';
  if (categoryLower.includes('soft') || categoryLower.includes('marshmallow')) return 'from-purple-400 to-purple-600';
  if (categoryLower.includes('licorice')) return 'from-gray-700 to-gray-900';
  
  return 'from-indigo-400 to-indigo-600';
};

export const getCategoryBgColor = (category: string): string => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('chocolate')) return 'bg-amber-50 border-amber-200';
  if (categoryLower.includes('gumm') || categoryLower.includes('jelly')) return 'bg-pink-50 border-pink-200';
  if (categoryLower.includes('hard')) return 'bg-blue-50 border-blue-200';
  if (categoryLower.includes('caramel')) return 'bg-orange-50 border-orange-200';
  if (categoryLower.includes('soft') || categoryLower.includes('marshmallow')) return 'bg-purple-50 border-purple-200';
  if (categoryLower.includes('licorice')) return 'bg-gray-50 border-gray-200';
  
  return 'bg-indigo-50 border-indigo-200';
};


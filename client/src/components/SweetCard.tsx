import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Sweet } from '../hooks/useSweets';
import { getSweetEmoji, getCategoryColor, getCategoryBgColor } from '../utils/sweetImages';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: string) => void;
  isPurchasing?: boolean;
}

export const SweetCard = ({ sweet, onPurchase, isPurchasing = false }: SweetCardProps) => {
  const isOutOfStock = sweet.quantity === 0;
  const isLowStock = sweet.quantity > 0 && sweet.quantity <= 5;
  const emoji = getSweetEmoji(sweet.category, sweet.name);
  const gradientColor = getCategoryColor(sweet.category);
  const bgColor = getCategoryBgColor(sweet.category);

  return (
    <Card className={`flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${bgColor} border-2`}>
      {/* Image/Emoji Section */}
      <div className={`bg-gradient-to-br ${gradientColor} p-6 rounded-t-lg`}>
        <div className="flex items-center justify-center h-32">
          <span className="text-8xl drop-shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
            {emoji}
          </span>
        </div>
      </div>

      <CardHeader className="bg-white">
        <CardTitle className="text-2xl font-bold text-gray-800">{sweet.name}</CardTitle>
        <p className="text-sm text-gray-600 capitalize font-medium">{sweet.category}</p>
      </CardHeader>

      <CardContent className="flex-1 bg-white">
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-gray-500">$</span>
            <p className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {sweet.price.toFixed(2)}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Stock:</span>
              <span className={`font-bold text-lg ${isLowStock ? 'text-orange-600' : isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                {sweet.quantity}
              </span>
            </div>
            {isLowStock && !isOutOfStock && (
              <span className="text-xs bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold">
                ⚠ Low Stock
              </span>
            )}
            {isOutOfStock && (
              <span className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-white rounded-b-lg">
        <Button
          onClick={() => onPurchase(sweet.id)}
          disabled={isOutOfStock || isPurchasing}
          className={`w-full py-3 text-lg font-semibold transition-all ${
            isOutOfStock 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isPurchasing ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> Processing...
            </span>
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            <span className="flex items-center gap-2">
              🛒 Purchase Now
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};


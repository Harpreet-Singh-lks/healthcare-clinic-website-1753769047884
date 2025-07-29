import React from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  thumbnailUrl: string;
  category: string;
  isFree?: boolean;
  isPopular?: boolean;
}

export interface ProductCardProps {
  product: Product;
  className?: string;
  onPurchase?: (product: Product) => void;
  buttonText?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className = '', 
  onPurchase,
  buttonText = "Get Started"
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `$${price}`;
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}>
      {/* Popular Badge */}
      {product.isPopular && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Popular
          </span>
        </div>
      )}

      {/* Product Thumbnail */}
      <div className="relative h-48 bg-gray-100">
        <img 
          src={product.thumbnailUrl} 
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {product.isFree && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
              FREE
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-gray-400 line-through text-sm">
                ${product.originalPrice}
              </span>
            )}
            <span className={`text-xl font-bold ${product.isFree ? 'text-green-600' : 'text-red-600'}`}>
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600 ml-1">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Call to Action Button */}
        <button
          onClick={() => onPurchase?.(product)}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// Default export for the component
export default ProductCard; 
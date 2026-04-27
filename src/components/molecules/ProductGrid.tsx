import React from 'react';
import { ProductCard, type ProductCardProps } from '../ProductCard';

export interface ProductGridProps {
  products: (ProductCardProps & { id: string })[];
  title?: string;
  onAddProduct?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  onAddProduct,
  onToggleFavorite,
  className
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h2 className="text-lg font-bold text-slate-100">{title}</h2>}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAdd={() => onAddProduct?.(product.id)}
            onToggleFavorite={() => onToggleFavorite?.(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

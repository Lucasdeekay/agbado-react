import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const productImage =
    product.images?.[0] ||
    "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-shadow group"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          data-testid={`img-product-${product.id}`}
        />
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-accent">Featured</Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3
          className="font-semibold text-secondary mb-2"
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h3>
        <p
          className="text-gray-600 text-sm mb-3 line-clamp-2"
          data-testid={`text-product-description-${product.id}`}
        >
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span
            className="text-lg font-bold text-accent"
            data-testid={`text-product-price-${product.id}`}
          >
            ₦{product.price.toLocaleString()}
          </span>
          <div className="flex items-center text-primary text-sm">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span data-testid={`text-product-rating-${product.id}`}>
              {product.rating}
            </span>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full btn-secondary"
          disabled={product.stock === 0}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>

        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-orange-500 text-xs mt-2 text-center">
            Only {product.stock} left in stock
          </p>
        )}
      </CardContent>
    </Card>
  );
}

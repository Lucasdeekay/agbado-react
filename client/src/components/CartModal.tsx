import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  const handleCheckout = () => {
    onClose();
    // Navigation will be handled by the Link component
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md max-h-[80vh] overflow-y-auto"
        data-testid="dialog-cart"
      >
        <DialogHeader>
          <DialogTitle>Shopping Cart ({items.length} items)</DialogTitle>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="text-center py-8" data-testid="text-empty-cart">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button
              onClick={onClose}
              className="btn-primary"
              data-testid="button-continue-shopping"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 pb-4 border-b"
                  data-testid={`cart-item-${item.id}`}
                >
                  <img
                    src={
                      item.product?.images?.[0] ||
                      "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                    }
                    alt={item.product?.name || "Product"}
                    className="w-16 h-16 rounded-lg object-cover"
                    data-testid={`img-cart-item-${item.id}`}
                  />
                  <div className="flex-1">
                    <h4
                      className="font-semibold text-secondary"
                      data-testid={`text-cart-item-name-${item.id}`}
                    >
                      {item.product?.name}
                    </h4>
                    <p
                      className="text-gray-500 text-sm"
                      data-testid={`text-cart-item-category-${item.id}`}
                    >
                      {item.product?.category}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className="text-accent font-bold"
                        data-testid={`text-cart-item-price-${item.id}`}
                      >
                        ₦
                        {(
                          (item.product?.price || 0) * item.quantity
                        ).toLocaleString()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          data-testid={`button-decrease-quantity-${item.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span
                          className="font-medium min-w-[2rem] text-center"
                          data-testid={`text-cart-item-quantity-${item.id}`}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          data-testid={`button-increase-quantity-${item.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                          data-testid={`button-remove-item-${item.id}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total:</span>
                <span className="text-accent" data-testid="text-cart-total">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <Link href="/checkout" onClick={onClose}>
                  <Button
                    className="w-full btn-secondary"
                    data-testid="button-checkout"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onClose}
                  data-testid="button-continue-shopping-cart"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

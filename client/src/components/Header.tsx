import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { CartModal } from "@/components/CartModal";
import { SearchForm } from "@/components/SearchForm";
import { Hammer, Menu, ShoppingCart, Search } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2"
              data-testid="logo-link"
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Hammer className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="text-2xl font-bold text-secondary">Agba-do</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link
                href="/services"
                className={`transition-colors hover:text-primary ${
                  isActive("/services")
                    ? "text-primary font-medium"
                    : "text-secondary"
                }`}
                data-testid="nav-services"
              >
                Services
              </Link>
              <Link
                href="/marketplace"
                className={`transition-colors hover:text-primary ${
                  isActive("/marketplace")
                    ? "text-primary font-medium"
                    : "text-secondary"
                }`}
                data-testid="nav-marketplace"
              >
                Marketplace
              </Link>
              <Link
                href="/providers"
                className={`transition-colors hover:text-primary ${
                  isActive("/providers")
                    ? "text-primary font-medium"
                    : "text-secondary"
                }`}
                data-testid="nav-providers"
              >
                Artisans
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-primary ${
                  isActive("/about")
                    ? "text-primary font-medium"
                    : "text-secondary"
                }`}
                data-testid="nav-about"
              >
                About
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                data-testid="button-search"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
                data-testid="button-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                    data-testid="badge-cart-count"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>

              <Button variant="outline" data-testid="button-signin">
                Sign In
              </Button>
              <Button
                className="btn-primary"
                data-testid="button-join-provider"
              >
                Join as Provider
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                data-testid="button-search-mobile"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
                data-testid="button-cart-mobile"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="button-mobile-menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/services"
                      className="text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                      data-testid="mobile-nav-services"
                    >
                      Services
                    </Link>
                    <Link
                      href="/marketplace"
                      className="text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                      data-testid="mobile-nav-marketplace"
                    >
                      Marketplace
                    </Link>
                    <Link
                      href="/providers"
                      className="text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                      data-testid="mobile-nav-providers"
                    >
                      Artisans
                    </Link>
                    <Link
                      href="/about"
                      className="text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                      data-testid="mobile-nav-about"
                    >
                      About
                    </Link>
                    <hr className="my-4" />
                    <Button
                      variant="outline"
                      className="w-full"
                      data-testid="mobile-button-signin"
                    >
                      Sign In
                    </Button>
                    <Button
                      className="btn-primary w-full"
                      data-testid="mobile-button-join-provider"
                    >
                      Join as Provider
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchForm
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { Search, Filter, Grid, List } from "lucide-react";
import type { Product } from "@shared/schema";

const productCategories = [
  "All Products",
  "Crafts",
  "Clothing",
  "Jewelry",
  "Home Decor",
  "Music",
  "Food",
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: products, isLoading } = useQuery({
    queryKey: [
      "/api/products",
      selectedCategory !== "All Products" ? { category: selectedCategory } : {},
    ],
  });

  const filteredAndSortedProducts =
    products
      ?.filter((product: Product) => {
        const matchesSearch =
          !searchQuery ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
      })
      .sort((a: Product, b: Product) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return parseFloat(b.rating) - parseFloat(a.rating);
          case "featured":
            return b.featured ? 1 : -1;
          default:
            return 0;
        }
      }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Nigerian Marketplace
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Discover authentic handcrafted products from talented Nigerian
              artisans
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
                data-testid="input-search-products"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-secondary mb-4">
            Shop by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {productCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "btn-primary" : ""}
                data-testid={`button-category-${category
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-gray-600" data-testid="text-product-count">
              {filteredAndSortedProducts.length} products found
            </span>
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                data-testid="button-grid-view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                data-testid="button-list-view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48" data-testid="select-sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid/List */}
        {isLoading ? (
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1"
            } gap-6`}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 rounded-2xl h-80"
              ></div>
            ))}
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1"
            } gap-6`}
          >
            {filteredAndSortedProducts.map((product: Product) => (
              <div
                key={product.id}
                className={viewMode === "list" ? "max-w-none" : ""}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16" data-testid="text-no-products">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or browse different categories
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Products");
              }}
              variant="outline"
              data-testid="button-clear-product-filters"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Featured Artisans Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Meet Our Artisans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Supporting local craftspeople and preserving traditional Nigerian
              arts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                alt="Nigerian artisan"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                data-testid="img-artisan-1"
              />
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Traditional Craftsmen
              </h3>
              <p className="text-gray-600">
                Preserving centuries-old techniques in woodcarving, bronze
                casting, and textile weaving
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b5cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                alt="Nigerian female artisan"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                data-testid="img-artisan-2"
              />
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Modern Designers
              </h3>
              <p className="text-gray-600">
                Contemporary artists blending traditional methods with modern
                aesthetics
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                alt="Young Nigerian entrepreneur"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                data-testid="img-artisan-3"
              />
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Young Entrepreneurs
              </h3>
              <p className="text-gray-600">
                Next generation of Nigerian creators bringing fresh perspectives
                to traditional crafts
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

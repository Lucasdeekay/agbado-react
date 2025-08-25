import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Search, Package, Users, Briefcase } from "lucide-react";

interface SearchFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchForm({ isOpen, onClose }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { data: searchResults, isLoading } = useQuery({
    queryKey: [
      "/api/search",
      { q: searchQuery, type: activeTab !== "all" ? activeTab : undefined },
    ],
    enabled: searchQuery.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the query above
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[80vh] overflow-y-auto"
        data-testid="dialog-search"
      >
        <DialogHeader>
          <DialogTitle>Search Agba-do</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for services, products, or providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-query"
            />
          </div>
        </form>

        {searchQuery.length > 2 && (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" data-testid="tab-all">
                All
              </TabsTrigger>
              <TabsTrigger value="services" data-testid="tab-services">
                Services
              </TabsTrigger>
              <TabsTrigger value="products" data-testid="tab-products">
                Products
              </TabsTrigger>
              <TabsTrigger value="providers" data-testid="tab-providers">
                Providers
              </TabsTrigger>
            </TabsList>

            {isLoading ? (
              <div className="text-center py-8" data-testid="text-searching">
                <p>Searching...</p>
              </div>
            ) : searchResults ? (
              <>
                <TabsContent value="all" className="space-y-4">
                  {/* Services */}
                  {searchResults.services?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Services
                      </h3>
                      <div className="space-y-2">
                        {searchResults.services
                          .slice(0, 3)
                          .map((service: any) => (
                            <div
                              key={service.id}
                              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                              data-testid={`search-result-service-${service.id}`}
                            >
                              <h4 className="font-medium">{service.name}</h4>
                              <p className="text-sm text-gray-600">
                                {service.description}
                              </p>
                              <p className="text-sm text-accent font-medium">
                                From ₦{service.startingPrice.toLocaleString()}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Products */}
                  {searchResults.products?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        Products
                      </h3>
                      <div className="space-y-2">
                        {searchResults.products
                          .slice(0, 3)
                          .map((product: any) => (
                            <div
                              key={product.id}
                              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                              data-testid={`search-result-product-${product.id}`}
                            >
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-gray-600">
                                {product.description}
                              </p>
                              <p className="text-sm text-accent font-medium">
                                ₦{product.price.toLocaleString()}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Providers */}
                  {searchResults.providers?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        Providers
                      </h3>
                      <div className="space-y-2">
                        {searchResults.providers
                          .slice(0, 3)
                          .map((provider: any) => (
                            <div
                              key={provider.id}
                              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                              data-testid={`search-result-provider-${provider.id}`}
                            >
                              <h4 className="font-medium">
                                {provider.businessName}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {provider.specialty}
                              </p>
                              <p className="text-sm text-accent font-medium">
                                ₦{provider.rate.toLocaleString()}/
                                {provider.rateType.replace("per ", "")}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {searchResults.services?.length === 0 &&
                    searchResults.products?.length === 0 &&
                    searchResults.providers?.length === 0 && (
                      <div
                        className="text-center py-8 text-gray-500"
                        data-testid="text-no-results"
                      >
                        No results found for "{searchQuery}"
                      </div>
                    )}
                </TabsContent>

                <TabsContent value="services">
                  {searchResults.services?.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.services.map((service: any) => (
                        <div
                          key={service.id}
                          className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          data-testid={`search-result-service-${service.id}`}
                        >
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-600">
                            {service.description}
                          </p>
                          <p className="text-sm text-accent font-medium">
                            From ₦{service.startingPrice.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No services found for "{searchQuery}"
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="products">
                  {searchResults.products?.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.products.map((product: any) => (
                        <div
                          key={product.id}
                          className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          data-testid={`search-result-product-${product.id}`}
                        >
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-600">
                            {product.description}
                          </p>
                          <p className="text-sm text-accent font-medium">
                            ₦{product.price.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="providers">
                  {searchResults.providers?.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.providers.map((provider: any) => (
                        <div
                          key={provider.id}
                          className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          data-testid={`search-result-provider-${provider.id}`}
                        >
                          <h4 className="font-medium">
                            {provider.businessName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {provider.specialty}
                          </p>
                          <p className="text-sm text-accent font-medium">
                            ₦{provider.rate.toLocaleString()}/
                            {provider.rateType.replace("per ", "")}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No providers found for "{searchQuery}"
                    </div>
                  )}
                </TabsContent>
              </>
            ) : (
              <div
                className="text-center py-8 text-gray-500"
                data-testid="text-start-searching"
              >
                Start typing to search...
              </div>
            )}
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}

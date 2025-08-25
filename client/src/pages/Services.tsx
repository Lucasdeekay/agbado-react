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
import { ServiceCard } from "@/components/ServiceCard";
import { ProviderCard } from "@/components/ProviderCard";
import { Search, Filter } from "lucide-react";
import type { ServiceCategory, Provider } from "@shared/schema";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const { data: serviceCategories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/service-categories"],
  });

  const { data: providers, isLoading: providersLoading } = useQuery({
    queryKey: [
      "/api/providers",
      selectedCategory ? { category: selectedCategory } : {},
    ],
  });

  const filteredProviders =
    providers?.filter((provider: Provider) => {
      const matchesSearch =
        !searchQuery ||
        provider.businessName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        !selectedLocation ||
        provider.serviceAreas?.some((area) =>
          area.toLowerCase().includes(selectedLocation.toLowerCase())
        );

      return matchesSearch && matchesLocation;
    }) || [];

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName === selectedCategory ? "" : categoryName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Professional Services
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Connect with verified service providers and skilled artisans
              across Nigeria
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search services or providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                  data-testid="input-search-services"
                />
              </div>

              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger
                  className="h-12"
                  data-testid="select-location-filter"
                >
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="lagos">Lagos</SelectItem>
                  <SelectItem value="abuja">Abuja</SelectItem>
                  <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                  <SelectItem value="kano">Kano</SelectItem>
                  <SelectItem value="ibadan">Ibadan</SelectItem>
                </SelectContent>
              </Select>

              <Button
                className="btn-secondary h-12"
                data-testid="button-search-services"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter Results
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
            Service Categories
          </h2>

          {categoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 rounded-2xl h-32"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {serviceCategories?.map((category: ServiceCategory) => (
                <div
                  key={category.id}
                  className={`cursor-pointer ${
                    selectedCategory === category.name
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <ServiceCard category={category} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Providers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-secondary">
              {selectedCategory
                ? `${selectedCategory} Providers`
                : "All Service Providers"}
            </h2>
            <span className="text-gray-600" data-testid="text-provider-count">
              {filteredProviders.length} providers found
            </span>
          </div>

          {providersLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 rounded-2xl h-96"
                ></div>
              ))}
            </div>
          ) : filteredProviders.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProviders.map((provider: Provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onBook={() => {
                    // TODO: Implement booking functionality
                    console.log("Book provider:", provider.id);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16" data-testid="text-no-providers">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No providers found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or browse all categories
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedLocation("");
                }}
                variant="outline"
                className="mt-4"
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How to Book Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              How to Book a Service
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to get your service booked and completed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Choose Provider
              </h3>
              <p className="text-gray-600">
                Browse through our verified providers, compare ratings, and read
                reviews
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Schedule & Pay
              </h3>
              <p className="text-gray-600">
                Select your preferred time slot and make secure payment through
                our platform
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Get Service Done
              </h3>
              <p className="text-gray-600">
                Provider arrives on time, completes the job, and you rate the
                experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

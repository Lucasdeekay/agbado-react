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
import { Badge } from "@/components/ui/badge";
import { ProviderCard } from "@/components/ProviderCard";
import { Search, Star, MapPin, Award, Users } from "lucide-react";
import type { Provider } from "@shared/schema";

const specialties = [
  "All Specialties",
  "Carpenter",
  "Electrician",
  "Plumber",
  "Hair Stylist",
  "Painter",
  "Cleaner",
  "Mechanic",
  "Tailor",
  "Chef",
];

const locations = [
  "All Locations",
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Ibadan",
  "Kaduna",
  "Benin City",
  "Jos",
  "Enugu",
  "Calabar",
];

export default function Providers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("rating");

  const { data: providers, isLoading } = useQuery({
    queryKey: ["/api/providers"],
  });

  const filteredAndSortedProviders =
    providers
      ?.filter((provider: Provider) => {
        const matchesSearch =
          !searchQuery ||
          provider.businessName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          provider.specialty
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          provider.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesSpecialty =
          selectedSpecialty === "All Specialties" ||
          provider.specialty
            .toLowerCase()
            .includes(selectedSpecialty.toLowerCase());

        const matchesLocation =
          selectedLocation === "All Locations" ||
          provider.serviceAreas?.some((area) =>
            area.toLowerCase().includes(selectedLocation.toLowerCase())
          );

        return matchesSearch && matchesSpecialty && matchesLocation;
      })
      .sort((a: Provider, b: Provider) => {
        switch (sortBy) {
          case "rating":
            return parseFloat(b.rating) - parseFloat(a.rating);
          case "reviews":
            return b.reviewCount - a.reviewCount;
          case "price-low":
            return a.rate - b.rate;
          case "price-high":
            return b.rate - a.rate;
          case "experience":
            return b.experience - a.experience;
          default:
            return 0;
        }
      }) || [];

  const topRatedProviders =
    providers?.filter((p: Provider) => parseFloat(p.rating) >= 4.8).length || 0;
  const verifiedProviders =
    providers?.filter((p: Provider) => p.verified).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Skilled Artisans & Service Providers
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Connect with Nigeria's most talented professionals. Every provider
              is verified and rated by our community.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mb-8 text-primary-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {providers?.length || 0}+
              </div>
              <div className="text-sm opacity-80">Total Providers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{verifiedProviders}+</div>
              <div className="text-sm opacity-80">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{topRatedProviders}+</div>
              <div className="text-sm opacity-80">Top Rated</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search providers by name or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                  data-testid="input-search-providers"
                />
              </div>

              <Select
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger className="h-12" data-testid="select-specialty">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="h-12" data-testid="select-location">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-secondary">
              {filteredAndSortedProviders.length} Provider
              {filteredAndSortedProviders.length !== 1 ? "s" : ""} Found
            </h2>
            {(selectedSpecialty !== "All Specialties" ||
              selectedLocation !== "All Locations") && (
              <p className="text-gray-600 mt-1">
                {selectedSpecialty !== "All Specialties" &&
                  `${selectedSpecialty} • `}
                {selectedLocation !== "All Locations" && selectedLocation}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                className="w-48"
                data-testid="select-sort-providers"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Providers Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 rounded-2xl h-96"
              ></div>
            ))}
          </div>
        ) : filteredAndSortedProviders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProviders.map((provider: Provider) => (
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
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No providers found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("All Specialties");
                setSelectedLocation("All Locations");
              }}
              variant="outline"
              data-testid="button-clear-provider-filters"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Why Choose Our Providers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Why Choose Our Providers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every provider on our platform meets strict quality standards
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Verified & Certified
              </h3>
              <p className="text-gray-600">
                All providers undergo background checks and skill verification
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Highly Rated
              </h3>
              <p className="text-gray-600">
                Only providers with excellent customer reviews and ratings
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Local & Reliable
              </h3>
              <p className="text-gray-600">
                Providers in your area who understand local needs and
                preferences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Community Supported
              </h3>
              <p className="text-gray-600">
                Supporting local businesses and skilled artisans in Nigeria
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

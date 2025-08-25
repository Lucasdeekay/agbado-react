import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface HeroProps {
  onSearch?: (query: string, location: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, selectedLocation);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="hero-gradient py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Connect with Nigeria's Best Artisans & Service Providers
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              From home repairs to beauty services, find trusted professionals
              and authentic Nigerian products all in one place.
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-2xl p-6 shadow-xl mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="h-12"
                    data-testid="input-service-search"
                  />
                </div>
                <div className="flex-1">
                  <Select
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger
                      className="h-12"
                      data-testid="select-location"
                    >
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="port-harcourt">
                        Port Harcourt
                      </SelectItem>
                      <SelectItem value="kano">Kano</SelectItem>
                      <SelectItem value="ibadan">Ibadan</SelectItem>
                      <SelectItem value="kaduna">Kaduna</SelectItem>
                      <SelectItem value="benin-city">Benin City</SelectItem>
                      <SelectItem value="jos">Jos</SelectItem>
                      <SelectItem value="enugu">Enugu</SelectItem>
                      <SelectItem value="calabar">Calabar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleSearch}
                  className="btn-secondary h-12 px-8"
                  data-testid="button-search-hero"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground font-medium">
                ✨ 10,000+ Verified Providers
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground font-medium">
                🚀 Same-Day Service
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground font-medium">
                🛡️ 100% Guaranteed
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Nigerian artisans working in workshop"
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="img-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

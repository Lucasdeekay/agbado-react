import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { ProviderCard } from "@/components/ProviderCard";
import { ProductCard } from "@/components/ProductCard";
import {
  ArrowRight,
  MapPin,
  Star,
  Users,
  Shield,
  Clock,
  Search,
} from "lucide-react";
import type { ServiceCategory, Provider, Product } from "@shared/schema";

export default function Home() {
  const { data: serviceCategories = [], isLoading: categoriesLoading } =
    useQuery<ServiceCategory[]>({
      queryKey: ["/api/service-categories"],
    });

  const { data: providers = [], isLoading: providersLoading } = useQuery<
    Provider[]
  >({
    queryKey: ["/api/providers"],
  });

  const { data: featuredProducts = [], isLoading: productsLoading } = useQuery<
    Product[]
  >({
    queryKey: ["/api/products?featured=true"],
  });

  const handleSearch = (query: string, location: string) => {
    console.log("Search:", query, location);
    // TODO: Implement search functionality
  };

  const topProviders = providers?.slice(0, 3) || [];
  const topCategories = serviceCategories?.slice(0, 6) || [];
  const topProducts = featuredProducts?.slice(0, 4) || [];

  const serviceCities = [
    { name: "Lagos", providers: "2,500+ Providers" },
    { name: "Abuja", providers: "1,800+ Providers" },
    { name: "Port Harcourt", providers: "1,200+ Providers" },
    { name: "Kano", providers: "900+ Providers" },
    { name: "Ibadan", providers: "750+ Providers" },
    { name: "Kaduna", providers: "600+ Providers" },
    { name: "Benin City", providers: "500+ Providers" },
    { name: "Jos", providers: "400+ Providers" },
    { name: "Enugu", providers: "450+ Providers" },
    { name: "Calabar", providers: "350+ Providers" },
    { name: "Uyo", providers: "300+ Providers" },
    { name: "Abeokuta", providers: "280+ Providers" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Adunni Okafor",
      location: "Lagos, Nigeria",
      review:
        "I found an amazing carpenter through Agba-do who built beautiful custom furniture for my home. The quality was exceptional and the price was very reasonable. Highly recommended!",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      id: 2,
      name: "Blessing Nwankwo",
      location: "Abuja, Nigeria",
      review:
        "The marketplace has amazing authentic Nigerian products! I bought beautiful Ankara fabrics and handcrafted jewelry. Fast delivery and excellent customer service.",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      id: 3,
      name: "Emmanuel Adebayo",
      location: "Port Harcourt, Nigeria",
      review:
        "As a service provider, Agba-do has transformed my business. I get consistent bookings and the platform is very easy to use. Great support team too!",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero onSearch={handleSearch} />

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Popular Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get professional services from verified providers across Nigeria
            </p>
          </div>

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
              {topCategories.map((category: ServiceCategory) => (
                <ServiceCard key={category.id} category={category} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/services">
              <Button
                className="btn-primary"
                data-testid="button-view-all-services"
              >
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Top-Rated Artisans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our skilled professionals who deliver exceptional quality
            </p>
          </div>

          {providersLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 rounded-2xl h-96"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topProviders.map((provider: Provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/providers">
              <Button
                className="btn-primary"
                data-testid="button-browse-artisans"
              >
                Browse All Artisans <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Nigerian Marketplace
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover authentic handcrafted products from local artisans
            </p>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 rounded-2xl h-80"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/marketplace">
              <Button
                className="btn-primary"
                data-testid="button-view-all-products"
              >
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 gradient-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Agba-do Works</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get connected with the right professionals in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-primary-foreground h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Search & Browse</h3>
              <p className="text-blue-100">
                Search for services or browse our marketplace. Read reviews and
                compare providers to find the perfect match for your needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-primary-foreground h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Book & Schedule</h3>
              <p className="text-blue-100">
                Book your preferred provider instantly or schedule for later.
                Communicate directly and discuss your requirements before the
                service.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-primary-foreground h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Get It Done</h3>
              <p className="text-blue-100">
                Your provider arrives on time and completes the job. Rate and
                review your experience to help others in the community.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              className="btn-primary text-lg px-8 py-4"
              data-testid="button-start-now"
            >
              Start Now - It's Free!
            </Button>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              We Serve All Major Nigerian Cities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with local artisans and service providers across Nigeria
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {serviceCities.map((city, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer group"
                data-testid={`service-city-${city.name
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                <MapPin className="mx-auto mb-3 h-8 w-8 text-secondary group-hover:text-primary-foreground" />
                <h3 className="font-semibold">{city.name}</h3>
                <p className="text-sm text-gray-500 group-hover:text-primary-foreground/70">
                  {city.providers}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Don't see your city? We're expanding rapidly!
            </p>
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-white"
              data-testid="button-request-city"
            >
              Request Your City
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from thousands of satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 shadow-lg"
                data-testid={`testimonial-${testimonial.id}`}
              >
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p
                  className="text-gray-600 mb-6"
                  data-testid={`testimonial-review-${testimonial.id}`}
                >
                  "{testimonial.review}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} testimonial`}
                    className="w-12 h-12 rounded-full mr-4"
                    data-testid={`testimonial-avatar-${testimonial.id}`}
                  />
                  <div>
                    <h4
                      className="font-semibold text-secondary"
                      data-testid={`testimonial-name-${testimonial.id}`}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className="text-gray-500 text-sm"
                      data-testid={`testimonial-location-${testimonial.id}`}
                    >
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="flex justify-center items-center space-x-8 text-secondary">
              <div className="text-center">
                <div className="text-3xl font-bold">50,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-gray-600">Verified Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerians who trust Agba-do for their service and
            shopping needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button
                className="btn-secondary text-lg px-8 py-4"
                data-testid="button-find-services"
              >
                <Users className="mr-2 h-5 w-5" />
                Find Services Now
              </Button>
            </Link>
            <Button
              variant="outline"
              className="bg-white text-secondary border-secondary hover:bg-gray-100 text-lg px-8 py-4"
              data-testid="button-become-provider"
            >
              <Shield className="mr-2 h-5 w-5" />
              Become a Provider
            </Button>
          </div>

          <div className="mt-12 text-primary-foreground/70">
            <p>🔒 Secure payments • ⚡ Quick bookings • 🌟 Verified reviews</p>
          </div>
        </div>
      </section>
    </div>
  );
}

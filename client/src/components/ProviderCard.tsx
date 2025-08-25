import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { Provider } from "@shared/schema";

interface ProviderCardProps {
  provider: Provider;
  onBook?: () => void;
}

export function ProviderCard({ provider, onBook }: ProviderCardProps) {
  const workImage =
    provider.workImages?.[0] ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250";

  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-shadow"
      data-testid={`provider-card-${provider.id}`}
    >
      <img
        src={workImage}
        alt={`${provider.businessName} work`}
        className="w-full h-48 object-cover"
        data-testid={`img-provider-work-${provider.id}`}
      />
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={
              provider.profileImage ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
            }
            alt={`${provider.businessName} profile`}
            className="w-12 h-12 rounded-full mr-4"
            data-testid={`img-provider-profile-${provider.id}`}
          />
          <div>
            <h3
              className="font-semibold text-secondary"
              data-testid={`text-provider-name-${provider.id}`}
            >
              {provider.businessName}
            </h3>
            <p
              className="text-gray-500 text-sm"
              data-testid={`text-provider-specialty-${provider.id}`}
            >
              {provider.specialty}
            </p>
          </div>
          {provider.verified && (
            <Badge variant="secondary" className="ml-auto">
              Verified
            </Badge>
          )}
        </div>

        <div className="flex items-center mb-3">
          <div className="flex text-primary mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(parseFloat(provider.rating))
                    ? "fill-current"
                    : ""
                }`}
              />
            ))}
          </div>
          <span
            className="text-sm text-gray-600"
            data-testid={`text-provider-rating-${provider.id}`}
          >
            {provider.rating} ({provider.reviewCount} reviews)
          </span>
        </div>

        <p
          className="text-gray-600 mb-4 text-sm"
          data-testid={`text-provider-description-${provider.id}`}
        >
          {provider.description}
        </p>

        <div className="flex justify-between items-center">
          <span
            className="text-lg font-semibold text-accent"
            data-testid={`text-provider-rate-${provider.id}`}
          >
            ₦{provider.rate.toLocaleString()}/
            {provider.rateType.replace("per ", "")}
          </span>
          <Button
            onClick={onBook}
            className="btn-secondary"
            data-testid={`button-book-provider-${provider.id}`}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

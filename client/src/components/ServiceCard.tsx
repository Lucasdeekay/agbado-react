import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ServiceCategory } from "@shared/schema";

interface ServiceCardProps {
  category: ServiceCategory;
  onClick?: () => void;
}

const colorClasses = {
  blue: "from-blue-50 to-indigo-100",
  green: "from-green-50 to-emerald-100",
  pink: "from-pink-50 to-rose-100",
  purple: "from-purple-50 to-violet-100",
  orange: "from-orange-50 to-amber-100",
  teal: "from-teal-50 to-cyan-100",
};

const iconColorClasses = {
  blue: "bg-secondary",
  green: "bg-accent",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  teal: "bg-teal-500",
};

export function ServiceCard({ category, onClick }: ServiceCardProps) {
  const gradientClass =
    colorClasses[category.color as keyof typeof colorClasses] ||
    "from-gray-50 to-gray-100";
  const iconColorClass =
    iconColorClasses[category.color as keyof typeof iconColorClasses] ||
    "bg-gray-500";

  return (
    <Card
      className="group cursor-pointer card-hover border-0"
      onClick={onClick}
      data-testid={`service-card-${category.id}`}
    >
      <CardContent
        className={`bg-gradient-to-br ${gradientClass} rounded-2xl p-6 text-center`}
      >
        <div
          className={`w-16 h-16 mx-auto mb-4 ${iconColorClass} rounded-full flex items-center justify-center group-hover:bg-primary transition-colors`}
        >
          <i className={`${category.icon} text-white text-2xl`}></i>
        </div>
        <h3 className="font-semibold text-secondary group-hover:text-secondary transition-colors mb-2">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          ₦{category.startingPrice.toLocaleString()}+
        </p>
      </CardContent>
    </Card>
  );
}

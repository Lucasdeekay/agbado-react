import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Users,
  Shield,
  Award,
  Heart,
  Target,
  Globe,
  Handshake,
  TrendingUp,
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Adebayo Ogundimu",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      bio: "Passionate about connecting Nigerian artisans with opportunities to grow their businesses.",
    },
    {
      id: 2,
      name: "Fatima Abdullahi",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      bio: "Ensuring seamless platform operations and exceptional user experiences across Nigeria.",
    },
    {
      id: 3,
      name: "Chike Okafor",
      role: "Technical Lead",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      bio: "Building robust technology solutions to power Nigeria's digital marketplace revolution.",
    },
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Community First",
      description:
        "We believe in supporting local communities and empowering Nigerian artisans to thrive in the digital economy.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Safety",
      description:
        "Every provider is verified and rated by our community. We prioritize secure transactions and reliable service delivery.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Excellence",
      description:
        "We maintain high standards by working only with skilled professionals who deliver exceptional results.",
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Fair Partnership",
      description:
        "We ensure fair pricing for customers while providing meaningful income opportunities for service providers.",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Company Founded",
      description:
        "Agba-do was established with a vision to digitize Nigeria's service economy",
    },
    {
      year: "2023",
      title: "First 1,000 Providers",
      description:
        "Reached our first milestone of verified service providers across Lagos",
    },
    {
      year: "2024",
      title: "National Expansion",
      description:
        "Expanded to 12 major cities with over 10,000+ verified providers",
    },
    {
      year: "Future",
      title: "Pan-African Vision",
      description:
        "Planning to expand across West Africa while deepening our Nigerian roots",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Empowering Nigerian Artisans & Service Providers
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              We're building Nigeria's largest trusted marketplace connecting
              skilled professionals with customers who need quality services and
              authentic products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button
                  className="btn-secondary text-lg px-8 py-4"
                  data-testid="button-find-services-about"
                >
                  Find Services
                </Button>
              </Link>
              <Button
                variant="outline"
                className="bg-white text-secondary border-secondary hover:bg-gray-100 text-lg px-8 py-4"
                data-testid="button-join-community"
              >
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                To create economic opportunities for Nigerian artisans and
                service providers while making it easier for customers to access
                quality services and authentic products.
              </p>
              <p className="text-gray-600">
                We believe that every skilled professional deserves access to
                customers who value their craft, and every customer deserves
                reliable, quality service providers they can trust.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Nigerian artisans working together"
                className="rounded-2xl shadow-lg w-full"
                data-testid="img-mission"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Agba-do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg"
                data-testid={`value-card-${index}`}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 gradient-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Impact by the Numbers</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              See how we're making a difference in Nigeria's economy
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                10,000+
              </div>
              <div className="text-blue-100">Verified Providers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                50,000+
              </div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <div className="text-blue-100">Nigerian Cities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">₦2B+</div>
              <div className="text-blue-100">Economic Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From startup to Nigeria's leading service marketplace
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-center mb-12 last:mb-0"
                data-testid={`milestone-${index}`}
              >
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <div className="text-2xl font-bold text-primary">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mr-8 mt-2"></div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-secondary mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people building the future of Nigeria's service
              economy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="text-center border-0 shadow-lg"
                data-testid={`team-member-${member.id}`}
              >
                <CardContent className="p-8">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    data-testid={`team-member-image-${member.id}`}
                  />
                  <h3
                    className="text-xl font-semibold text-secondary mb-1"
                    data-testid={`team-member-name-${member.id}`}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-primary font-medium mb-4"
                    data-testid={`team-member-role-${member.id}`}
                  >
                    {member.role}
                  </p>
                  <p
                    className="text-gray-600 text-sm"
                    data-testid={`team-member-bio-${member.id}`}
                  >
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Join the Agba-do Community?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Whether you're looking for quality services or want to grow your
            business, we're here to help you succeed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button
                className="btn-secondary text-lg px-8 py-4"
                data-testid="button-get-started"
              >
                Get Started Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="bg-white text-secondary border-secondary hover:bg-gray-100 text-lg px-8 py-4"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

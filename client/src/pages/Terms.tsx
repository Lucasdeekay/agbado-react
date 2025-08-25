import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  FileText,
  Scale,
  Shield,
  AlertTriangle,
  Users,
  Mail,
} from "lucide-react";

export default function Terms() {
  const lastUpdated = "December 1, 2024";

  const sections = [
    {
      id: "acceptance-terms",
      title: "Acceptance of Terms",
      icon: <Scale className="h-5 w-5" />,
      content: [
        "By accessing and using Agba-do, you accept and agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, you may not access or use our services.",
        "These terms apply to all users, including customers, service providers, and marketplace sellers.",
        "You must be at least 18 years old to use our platform.",
        "By using our service, you represent that you have the legal capacity to enter into these terms.",
      ],
    },
    {
      id: "platform-services",
      title: "Platform Services",
      icon: <Users className="h-5 w-5" />,
      content: [
        "Agba-do is a marketplace platform that connects customers with service providers and product sellers.",
        "We facilitate transactions but are not a party to the actual service agreements between users.",
        "Service providers are independent contractors, not employees of Agba-do.",
        "We do not guarantee the quality, safety, or legality of services or products offered.",
        "All interactions and transactions are between you and the service provider or seller.",
        "We reserve the right to modify, suspend, or discontinue services at any time.",
      ],
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "Provide accurate, current, and complete information during registration and use.",
        "Maintain the confidentiality of your account credentials.",
        "Use the platform only for lawful purposes and in accordance with these terms.",
        "Not engage in fraudulent, abusive, or illegal activities.",
        "Respect the intellectual property rights of others.",
        "Not interfere with or disrupt the platform's functionality.",
        "Report any violations of these terms to our support team.",
      ],
    },
    {
      id: "service-provider-terms",
      title: "Service Provider Terms",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "Service providers must be qualified and legally authorized to provide their services.",
        "Maintain appropriate licenses, insurance, and certifications as required by law.",
        "Provide services in a professional manner and as described in listings.",
        "Honor confirmed bookings and complete services as agreed.",
        "Follow all applicable laws and regulations in service delivery.",
        "Maintain confidentiality of customer information.",
        "Respond promptly to customer inquiries and platform communications.",
      ],
    },
    {
      id: "payments-fees",
      title: "Payments and Fees",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "Customers are responsible for paying the full amount for services and products booked.",
        "Agba-do charges service fees as disclosed during the booking process.",
        "Payment processing is handled through secure third-party payment processors.",
        "Service providers receive payment minus applicable platform fees and transaction costs.",
        "Refunds are subject to our refund policy and individual service provider policies.",
        "All fees are clearly disclosed before transaction completion.",
        "Price disputes must be reported within 48 hours of service completion.",
      ],
    },
    {
      id: "cancellations-refunds",
      title: "Cancellations and Refunds",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "Customers may cancel bookings subject to the service provider's cancellation policy.",
        "Refunds for cancelled services are processed according to individual provider policies.",
        "Agba-do platform fees may be non-refundable in certain circumstances.",
        "Service providers may charge cancellation fees for late cancellations or no-shows.",
        "Product purchases may be refunded according to seller return policies.",
        "Emergency cancellations due to unforeseen circumstances may receive full refunds.",
        "Refund processing typically takes 5-10 business days.",
      ],
    },
    {
      id: "liability-disclaimers",
      title: "Liability and Disclaimers",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "Agba-do acts as an intermediary and is not liable for the actions of service providers or customers.",
        "We do not guarantee the quality, safety, or outcome of any services or products.",
        "Users engage service providers and purchase products at their own risk.",
        "We disclaim all warranties, express or implied, regarding platform services.",
        "Our liability is limited to the maximum extent permitted by law.",
        "Users are encouraged to verify credentials and obtain appropriate insurance.",
        "We are not responsible for disputes between customers and service providers.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Scale className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Please read these terms carefully before using our platform. They
              govern your use of Agba-do services.
            </p>
            <p className="text-gray-500">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary mb-6">
              Table of Contents
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid={`toc-link-${section.id}`}
                >
                  {section.icon}
                  <span className="ml-3 font-medium">{section.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-secondary mb-4">
                  Introduction
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    Welcome to Agba-do ("we," "our," or "us"). These Terms of
                    Service ("Terms") govern your use of our online platform and
                    services that connect customers with service providers and
                    facilitate the purchase of products from local artisans and
                    sellers.
                  </p>
                  <p className="mb-4">
                    Our platform operates as a marketplace where users can
                    discover, book, and pay for various services, as well as
                    purchase authentic Nigerian products. We facilitate these
                    transactions but are not a party to the agreements between
                    customers and service providers.
                  </p>
                  <p>
                    These Terms constitute a legal agreement between you and
                    Agba-do. Please read them carefully and contact us if you
                    have any questions before using our services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Terms Sections */}
            {sections.map((section, index) => (
              <Card
                key={section.id}
                id={section.id}
                className="shadow-lg border-0"
                data-testid={`section-${section.id}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground mr-4">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-secondary">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Additional Important Terms */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-secondary mb-6">
                  Additional Important Terms
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary mb-2">
                      Intellectual Property
                    </h3>
                    <p className="text-gray-700">
                      All content on our platform, including text, graphics,
                      logos, and software, is owned by Agba-do or our licensors
                      and is protected by intellectual property laws. Users may
                      not reproduce, distribute, or create derivative works
                      without permission.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-secondary mb-2">
                      Privacy and Data Protection
                    </h3>
                    <p className="text-gray-700">
                      Your privacy is important to us. Please review our Privacy
                      Policy to understand how we collect, use, and protect your
                      personal information. By using our service, you consent to
                      our privacy practices.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-secondary mb-2">
                      Dispute Resolution
                    </h3>
                    <p className="text-gray-700">
                      Any disputes arising from these terms or your use of our
                      platform will be resolved through binding arbitration in
                      accordance with Nigerian law. We encourage users to first
                      attempt to resolve disputes through our customer support
                      team.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-secondary mb-2">
                      Termination
                    </h3>
                    <p className="text-gray-700">
                      We reserve the right to suspend or terminate your account
                      at any time for violations of these terms or for any other
                      reason at our sole discretion. Users may also terminate
                      their accounts at any time through their account settings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-primary to-yellow-400">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 text-primary-foreground mr-3" />
                  <h2 className="text-2xl font-bold text-primary-foreground">
                    Questions About These Terms?
                  </h2>
                </div>
                <p className="text-primary-foreground/90 mb-6">
                  If you have questions about these Terms of Service or need
                  clarification on any provisions, please don't hesitate to
                  contact our legal team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="bg-white text-secondary border-white hover:bg-gray-100"
                      data-testid="button-contact-legal"
                    >
                      Contact Legal Team
                    </Button>
                  </Link>
                  <Link href="/privacy">
                    <Button
                      variant="outline"
                      className="border-white text-primary-foreground hover:bg-white hover:text-secondary"
                      data-testid="button-view-privacy"
                    >
                      View Privacy Policy
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Acknowledgment */}
            <Card className="shadow-lg border-0 border-l-4 border-l-primary">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-secondary mb-4">
                  Acknowledgment
                </h2>
                <p className="text-gray-700 mb-4">
                  By using Agba-do, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms of Service.
                  You also acknowledge that these terms may be updated from time
                  to time, and your continued use of the platform constitutes
                  acceptance of any changes.
                </p>
                <p className="text-gray-700">
                  These terms are effective as of the date last updated above
                  and will remain in effect until terminated in accordance with
                  the provisions herein.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

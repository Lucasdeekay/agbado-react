import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Eye, Lock, UserCheck, Globe, Mail } from "lucide-react";

export default function Privacy() {
  const lastUpdated = "December 1, 2024";

  const sections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: <Eye className="h-5 w-5" />,
      content: [
        "Personal Information: Name, email address, phone number, and address when you create an account or make a booking.",
        "Payment Information: Credit card details, bank account information (processed securely through our payment partners).",
        "Service Information: Details about services booked, ratings, and reviews you provide.",
        "Usage Information: How you interact with our platform, including pages visited and features used.",
        "Device Information: IP address, browser type, operating system, and mobile device identifiers.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      icon: <UserCheck className="h-5 w-5" />,
      content: [
        "To provide and improve our services, including matching you with service providers.",
        "To process payments and prevent fraudulent transactions.",
        "To communicate with you about bookings, account updates, and promotional offers.",
        "To ensure platform safety through user verification and background checks.",
        "To analyze usage patterns and improve user experience.",
        "To comply with legal obligations and resolve disputes.",
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: <Globe className="h-5 w-5" />,
      content: [
        "Service Providers: We share necessary information with providers to fulfill your bookings.",
        "Payment Processors: Financial information is shared with secure payment processing partners.",
        "Legal Requirements: We may disclose information to comply with legal processes or government requests.",
        "Business Transfers: In case of merger, acquisition, or sale, user information may be transferred.",
        "Consent: We may share information with your explicit consent for specific purposes.",
        "We never sell your personal information to third parties for marketing purposes.",
      ],
    },
    {
      id: "data-security",
      title: "Data Security and Protection",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "We use industry-standard encryption to protect your data during transmission and storage.",
        "Regular security audits and monitoring to detect and prevent unauthorized access.",
        "Employee access to personal information is strictly limited and monitored.",
        "Secure payment processing through PCI DSS compliant service providers.",
        "Regular data backups with secure, encrypted storage solutions.",
        "Immediate response protocols for any suspected security incidents.",
      ],
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      icon: <Lock className="h-5 w-5" />,
      content: [
        "Access: Request copies of your personal information we hold.",
        "Correction: Update or correct inaccurate personal information.",
        "Deletion: Request deletion of your personal information (subject to legal requirements).",
        "Portability: Request transfer of your data in a machine-readable format.",
        "Objection: Object to processing of your information for certain purposes.",
        "Withdrawal: Withdraw consent for data processing where consent was the legal basis.",
      ],
    },
    {
      id: "cookies-tracking",
      title: "Cookies and Tracking Technologies",
      icon: <Eye className="h-5 w-5" />,
      content: [
        "Essential Cookies: Required for basic platform functionality and security.",
        "Performance Cookies: Help us understand how users interact with our platform.",
        "Functionality Cookies: Remember your preferences and settings.",
        "Marketing Cookies: Used to deliver relevant advertisements and measure campaign effectiveness.",
        "You can control cookie preferences through your browser settings.",
        "Some features may not work properly if cookies are disabled.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
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
                    Welcome to Agba-do. We are committed to protecting your
                    privacy and ensuring the security of your personal
                    information. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you use
                    our platform to connect with service providers and purchase
                    products.
                  </p>
                  <p className="mb-4">
                    By using Agba-do, you agree to the collection and use of
                    information in accordance with this policy. If you do not
                    agree with our policies and practices, please do not use our
                    services.
                  </p>
                  <p>
                    This policy applies to all users of our platform, including
                    customers seeking services, service providers offering their
                    skills, and marketplace sellers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Policy Sections */}
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

            {/* Contact Section */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-primary to-yellow-400">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 text-primary-foreground mr-3" />
                  <h2 className="text-2xl font-bold text-primary-foreground">
                    Questions About This Policy?
                  </h2>
                </div>
                <p className="text-primary-foreground/90 mb-6">
                  If you have questions about this Privacy Policy, need to
                  report a privacy concern, or want to exercise your privacy
                  rights, please contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="bg-white text-secondary border-white hover:bg-gray-100"
                      data-testid="button-contact-privacy"
                    >
                      Contact Our Privacy Team
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-white text-primary-foreground hover:bg-white hover:text-secondary"
                    data-testid="button-privacy-rights"
                  >
                    Exercise Your Rights
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Updates Notice */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-secondary mb-4">
                  Policy Updates
                </h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, technology, legal requirements, or
                  other factors. When we make significant changes, we will
                  notify you through:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Email notifications to registered users</li>
                  <li>Prominent notices on our platform</li>
                  <li>
                    Updates to the "Last updated" date at the top of this policy
                  </li>
                </ul>
                <p className="text-gray-700">
                  We encourage you to review this Privacy Policy periodically to
                  stay informed about how we are protecting your information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

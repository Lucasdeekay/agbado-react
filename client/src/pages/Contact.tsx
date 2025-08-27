import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Users,
  HelpCircle,
  Building2,
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactCategories = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Customer Support" },
  { value: "provider", label: "Provider Support" },
  { value: "technical", label: "Technical Issue" },
  { value: "business", label: "Business Partnership" },
  { value: "feedback", label: "Feedback & Suggestions" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Contact form submitted:", data);

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: "support@agba-do.com",
      description: "Send us an email anytime",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      details: "+234 800 AGBA-DO",
      description: "24/7 customer support",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Address",
      details: "Lagos, Nigeria",
      description: "Visit our headquarters",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Hours",
      details: "Mon-Fri 8AM-6PM WAT",
      description: "West Africa Time",
    },
  ];

  const supportOptions = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Support",
      description: "Get help with bookings, payments, or general questions",
      action: "Contact Support",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Provider Support",
      description: "Assistance for service providers and marketplace sellers",
      action: "Provider Help",
    },
    {
      icon: <HelpCircle className="h-8 w-8" />,
      title: "FAQ",
      description: "Quick answers to common questions",
      action: "View FAQ",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              We're here to help! Reach out to us with any questions, feedback,
              or support needs.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                                data-testid="input-contact-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                {...field}
                                data-testid="input-contact-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Enter your phone number"
                                {...field}
                                data-testid="input-contact-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger data-testid="select-contact-category">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {contactCategories.map((category) => (
                                  <SelectItem
                                    key={category.value}
                                    value={category.value}
                                  >
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What is your message about?"
                              {...field}
                              data-testid="input-contact-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your inquiry..."
                              className="min-h-[120px]"
                              {...field}
                              data-testid="textarea-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full btn-primary text-lg py-3"
                      disabled={isSubmitting}
                      data-testid="button-send-message"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3"
                      data-testid={`contact-info-${index}`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary">
                          {info.title}
                        </h4>
                        <p className="text-accent font-medium">
                          {info.details}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-6">
                  Quick Help
                </h3>
                <div className="space-y-4">
                  {supportOptions.map((option, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      data-testid={`support-option-${index}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 text-primary">
                          {option.icon}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-secondary mb-1">
                            {option.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-2">
                            {option.description}
                          </p>
                          <Button variant="outline" size="sm">
                            {option.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about Agba-do
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-secondary mb-2">
                  How do I book a service?
                </h3>
                <p className="text-gray-600">
                  Simply browse our services, select a provider, choose your
                  preferred time slot, and make payment through our secure
                  platform.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-semibold text-secondary mb-2">
                  Are all providers verified?
                </h3>
                <p className="text-gray-600">
                  Yes, all our providers undergo background checks and skill
                  verification before joining our platform.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-semibold text-secondary mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept bank cards, bank transfers, and mobile money
                  payments for your convenience.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-secondary mb-2">
                  How do I become a service provider?
                </h3>
                <p className="text-gray-600">
                  Click on "Join as Provider" in our header menu and complete
                  the registration and verification process.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-semibold text-secondary mb-2">
                  What if I'm not satisfied with a service?
                </h3>
                <p className="text-gray-600">
                  We have a satisfaction guarantee policy. Contact our support
                  team and we'll work to resolve any issues.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-semibold text-secondary mb-2">
                  Do you offer customer support?
                </h3>
                <p className="text-gray-600">
                  Yes, we provide 24/7 customer support through multiple
                  channels including phone, email, and live chat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

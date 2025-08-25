import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link, useLocation } from "wouter";
import {
  CreditCard,
  MapPin,
  ShoppingBag,
  CheckCircle,
  Truck,
  Shield,
  Clock,
} from "lucide-react";

const checkoutFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter your complete address"),
  city: z.string().min(2, "Please select a city"),
  state: z.string().min(2, "Please select a state"),
  postalCode: z.string().optional(),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardName: z.string().optional(),
  specialInstructions: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

const nigerianStates = [
  "Lagos",
  "Abuja",
  "Kano",
  "Rivers",
  "Oyo",
  "Kaduna",
  "Ogun",
  "Imo",
  "Plateau",
  "Borno",
  "Osun",
  "Delta",
  "Anambra",
  "Taraba",
  "Katsina",
  "Cross River",
  "Niger",
  "Akwa Ibom",
  "Edo",
  "Kwara",
  "Enugu",
  "Kebbi",
  "Sokoto",
  "Adamawa",
  "Jigawa",
  "Gombe",
  "Yobe",
  "Ekiti",
  "Abia",
  "Bayelsa",
  "Bauchi",
  "Zamfara",
  "Ebonyi",
  "Ondo",
  "Nasarawa",
  "Kogi",
];

const paymentMethods = [
  {
    value: "card",
    label: "Credit/Debit Card",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    value: "bank",
    label: "Bank Transfer",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    value: "mobile",
    label: "Mobile Money",
    icon: <Clock className="h-4 w-4" />,
  },
];

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<
    "shipping" | "payment" | "review" | "success"
  >("shipping");
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      paymentMethod: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      specialInstructions: "",
    },
  });

  const selectedPaymentMethod = form.watch("paymentMethod");
  const shippingFee = 2000;
  const totalAmount = totalPrice + shippingFee;

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: (order) => {
      clearCart();
      setStep("success");
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.id.slice(0, 8)} has been confirmed.`,
      });
    },
    onError: () => {
      toast({
        title: "Order failed",
        description:
          "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    const orderData = {
      total: totalAmount,
      status: "pending",
      shippingAddress: `${data.address}, ${data.city}, ${data.state}`,
    };

    createOrderMutation.mutate(orderData);
  };

  // Redirect if cart is empty
  if (items.length === 0 && step !== "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add some products to your cart before checkout
          </p>
          <Link href="/marketplace">
            <Button
              className="btn-primary"
              data-testid="button-continue-shopping-empty"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 shadow-lg border-0">
          <CardContent className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. You'll receive a confirmation email
              with tracking details shortly.
            </p>
            <div className="space-y-3">
              <Link href="/marketplace">
                <Button
                  className="w-full btn-primary"
                  data-testid="button-continue-shopping-success"
                >
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full"
                  data-testid="button-back-home"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-secondary">Checkout</h1>
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center ${
                  step === "shipping" ? "text-primary" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "shipping"
                      ? "bg-primary text-white"
                      : "bg-gray-200"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 font-medium">Shipping</span>
              </div>
              <div
                className={`flex items-center ${
                  step === "payment" ? "text-primary" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "payment" ? "bg-primary text-white" : "bg-gray-200"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
              <div
                className={`flex items-center ${
                  step === "review" ? "text-primary" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "review" ? "bg-primary text-white" : "bg-gray-200"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 font-medium">Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Shipping Information */}
                {(step === "shipping" || step === "review") && (
                  <Card className="shadow-lg border-0 mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="mr-2 h-5 w-5" />
                        Shipping Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="First name"
                                  {...field}
                                  disabled={step === "review"}
                                  data-testid="input-first-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Last name"
                                  {...field}
                                  disabled={step === "review"}
                                  data-testid="input-last-name"
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
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Email address"
                                  {...field}
                                  disabled={step === "review"}
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="Phone number"
                                  {...field}
                                  disabled={step === "review"}
                                  data-testid="input-phone"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Full address"
                                {...field}
                                disabled={step === "review"}
                                data-testid="textarea-address"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={step === "review"}
                              >
                                <FormControl>
                                  <SelectTrigger data-testid="select-state">
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {nigerianStates.map((state) => (
                                    <SelectItem
                                      key={state}
                                      value={state.toLowerCase()}
                                    >
                                      {state}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="City"
                                  {...field}
                                  disabled={step === "review"}
                                  data-testid="input-city"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Postal code"
                                  {...field}
                                  disabled={step === "review"}
                                  data-testid="input-postal-code"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payment Information */}
                {(step === "payment" || step === "review") && (
                  <Card className="shadow-lg border-0 mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Payment Method</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={step === "review"}
                            >
                              <FormControl>
                                <SelectTrigger data-testid="select-payment-method">
                                  <SelectValue placeholder="Choose payment method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {paymentMethods.map((method) => (
                                  <SelectItem
                                    key={method.value}
                                    value={method.value}
                                  >
                                    <div className="flex items-center">
                                      {method.icon}
                                      <span className="ml-2">
                                        {method.label}
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {selectedPaymentMethod === "card" &&
                        step !== "review" && (
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="cardName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cardholder Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Name on card"
                                      {...field}
                                      data-testid="input-card-name"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="cardNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Number</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="1234 5678 9012 3456"
                                      {...field}
                                      data-testid="input-card-number"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Expiry Date</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="MM/YY"
                                        {...field}
                                        data-testid="input-expiry-date"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="123"
                                        {...field}
                                        data-testid="input-cvv"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        )}

                      {selectedPaymentMethod === "bank" &&
                        step !== "review" && (
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              You will receive bank account details after
                              placing your order. Transfer must be completed
                              within 24 hours.
                            </p>
                          </div>
                        )}

                      {selectedPaymentMethod === "mobile" &&
                        step !== "review" && (
                          <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-800">
                              We accept payments via mobile money services.
                              You'll receive payment instructions after placing
                              your order.
                            </p>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                )}

                {/* Special Instructions */}
                {step === "shipping" && (
                  <Card className="shadow-lg border-0 mb-8">
                    <CardContent className="pt-6">
                      <FormField
                        control={form.control}
                        name="specialInstructions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Special Instructions (Optional)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any special delivery instructions..."
                                {...field}
                                data-testid="textarea-special-instructions"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (step === "payment") setStep("shipping");
                      else if (step === "review") setStep("payment");
                    }}
                    className={step === "shipping" ? "invisible" : ""}
                    data-testid="button-back"
                  >
                    Back
                  </Button>

                  {step === "shipping" && (
                    <Button
                      type="button"
                      onClick={() => setStep("payment")}
                      className="btn-primary"
                      data-testid="button-continue-payment"
                    >
                      Continue to Payment
                    </Button>
                  )}

                  {step === "payment" && (
                    <Button
                      type="button"
                      onClick={() => setStep("review")}
                      className="btn-primary"
                      data-testid="button-review-order"
                    >
                      Review Order
                    </Button>
                  )}

                  {step === "review" && (
                    <Button
                      type="submit"
                      className="btn-primary"
                      disabled={createOrderMutation.isPending}
                      data-testid="button-place-order"
                    >
                      {createOrderMutation.isPending
                        ? "Placing Order..."
                        : "Place Order"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3"
                      data-testid={`order-summary-item-${item.id}`}
                    >
                      <img
                        src={item.product?.images?.[0] || ""}
                        alt={item.product?.name || "Product"}
                        className="w-12 h-12 rounded-lg object-cover"
                        data-testid={`order-summary-img-${item.id}`}
                      />
                      <div className="flex-1">
                        <h4
                          className="font-medium text-sm"
                          data-testid={`order-summary-name-${item.id}`}
                        >
                          {item.product?.name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span
                        className="font-medium"
                        data-testid={`order-summary-price-${item.id}`}
                      >
                        ₦
                        {(
                          (item.product?.price || 0) * item.quantity
                        ).toLocaleString()}
                      </span>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span data-testid="text-subtotal">
                        ₦{totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span data-testid="text-shipping">
                        ₦{shippingFee.toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span
                        className="text-accent"
                        data-testid="text-total-amount"
                      >
                        ₦{totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Truck className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">
                          Delivery Information
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">
                          Standard delivery (3-7 business days)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-green-800 text-sm font-medium">
                        Secure Payment Guaranteed
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

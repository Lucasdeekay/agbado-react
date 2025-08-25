import { Link } from "wouter";
import { Hammer, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Hammer className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="text-2xl font-bold">Agba-do</span>
            </div>
            <p className="text-gray-100 mb-6">
              Connecting Nigerians with trusted artisans and service providers.
              Building communities through quality services and authentic
              products.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-100 hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-primary transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Customers */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Customers</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-services"
                >
                  Find Services
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-marketplace"
                >
                  Browse Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-how-it-works"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-support"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-safety"
                >
                  Safety Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Providers</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-join-provider"
                >
                  Join as Provider
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-sell-products"
                >
                  Sell Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-provider-resources"
                >
                  Provider Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-success-stories"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-provider-support"
                >
                  Provider Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-careers"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-press"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-blog"
                >
                  Blog
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-100 hover:text-white transition-colors"
                  data-testid="footer-link-contact"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link
                href="/privacy"
                className="text-gray-100 hover:text-white transition-colors text-sm"
                data-testid="footer-link-privacy"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-100 hover:text-white transition-colors text-sm"
                data-testid="footer-link-terms"
              >
                Terms of Service
              </Link>
              <a
                href="#"
                className="text-gray-100 hover:text-white transition-colors text-sm"
                data-testid="footer-link-cookies"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-white transition-colors text-sm"
                data-testid="footer-link-refund"
              >
                Refund Policy
              </a>
            </div>
            <div className="text-gray-100 text-sm" data-testid="text-copyright">
              © 2024 Agba-do. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

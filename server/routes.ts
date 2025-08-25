import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCartItemSchema, insertOrderSchema, insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
    // Service Categories
    app.get("/api/service-categories", async (req, res) => {
        try {
            const categories = await storage.getServiceCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch service categories" });
        }
    });

    // Providers
    app.get("/api/providers", async (req, res) => {
        try {
            const { category } = req.query;
            let providers;

            if (category && typeof category === "string") {
                providers = await storage.getProvidersByCategory(category);
            } else {
                providers = await storage.getProviders();
            }

            res.json(providers);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch providers" });
        }
    });

    app.get("/api/providers/:id", async (req, res) => {
        try {
            const provider = await storage.getProvider(req.params.id);
            if (!provider) {
                return res.status(404).json({ message: "Provider not found" });
            }
            res.json(provider);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch provider" });
        }
    });

    // Products
    app.get("/api/products", async (req, res) => {
        try {
            const { category, featured } = req.query;
            let products;

            if (featured === "true") {
                products = await storage.getFeaturedProducts();
            } else if (category && typeof category === "string") {
                products = await storage.getProductsByCategory(category);
            } else {
                products = await storage.getProducts();
            }

            res.json(products);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch products" });
        }
    });

    app.get("/api/products/:id", async (req, res) => {
        try {
            const product = await storage.getProduct(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch product" });
        }
    });

    // Cart (using session-based user ID for demo)
    app.get("/api/cart", async (req, res) => {
        try {
            const userId = req.session?.userId || "demo-user";
            const cartItems = await storage.getCartItems(userId);

            // Get product details for each cart item
            const cartWithProducts = await Promise.all(
                cartItems.map(async (item) => {
                    const product = await storage.getProduct(item.productId);
                    return {
                        ...item,
                        product
                    };
                })
            );

            res.json(cartWithProducts);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch cart items" });
        }
    });

    app.post("/api/cart", async (req, res) => {
        try {
            const cartItemData = insertCartItemSchema.parse({
                ...req.body,
                userId: req.session?.userId || "demo-user"
            });

            const cartItem = await storage.addToCart(cartItemData);
            res.status(201).json(cartItem);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to add item to cart" });
        }
    });

    app.put("/api/cart/:id", async (req, res) => {
        try {
            const { quantity } = req.body;
            if (typeof quantity !== "number" || quantity < 1) {
                return res.status(400).json({ message: "Invalid quantity" });
            }

            const updatedItem = await storage.updateCartItem(req.params.id, quantity);
            if (!updatedItem) {
                return res.status(404).json({ message: "Cart item not found" });
            }

            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: "Failed to update cart item" });
        }
    });

    app.delete("/api/cart/:id", async (req, res) => {
        try {
            const success = await storage.removeFromCart(req.params.id);
            if (!success) {
                return res.status(404).json({ message: "Cart item not found" });
            }

            res.json({ message: "Item removed from cart" });
        } catch (error) {
            res.status(500).json({ message: "Failed to remove item from cart" });
        }
    });

    // Orders
    app.post("/api/orders", async (req, res) => {
        try {
            const orderData = insertOrderSchema.parse({
                ...req.body,
                userId: req.session?.userId || "demo-user"
            });

            const order = await storage.createOrder(orderData);

            // Clear cart after successful order
            const cartItems = await storage.getCartItems(orderData.userId);
            await Promise.all(cartItems.map(item => storage.removeFromCart(item.id)));

            res.status(201).json(order);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid order data", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to create order" });
        }
    });

    // Bookings
    app.post("/api/bookings", async (req, res) => {
        try {
            const bookingData = insertBookingSchema.parse({
                ...req.body,
                userId: req.session?.userId || "demo-user"
            });

            const booking = await storage.createBooking(bookingData);
            res.status(201).json(booking);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to create booking" });
        }
    });

    // Search
    app.get("/api/search", async (req, res) => {
        try {
            const { q, type } = req.query;

            if (!q || typeof q !== "string") {
                return res.status(400).json({ message: "Search query is required" });
            }

            const query = q.toLowerCase();
            let results = { services: [], products: [], providers: [] };

            if (!type || type === "services" || type === "all") {
                const categories = await storage.getServiceCategories();
                results.services = categories.filter(cat =>
                    cat.name.toLowerCase().includes(query) ||
                    cat.description?.toLowerCase().includes(query)
                );
            }

            if (!type || type === "products" || type === "all") {
                const products = await storage.getProducts();
                results.products = products.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );
            }

            if (!type || type === "providers" || type === "all") {
                const providers = await storage.getProviders();
                results.providers = providers.filter(provider =>
                    provider.businessName.toLowerCase().includes(query) ||
                    provider.specialty.toLowerCase().includes(query) ||
                    provider.description.toLowerCase().includes(query)
                );
            }

            res.json(results);
        } catch (error) {
            res.status(500).json({ message: "Search failed" });
        }
    });

    const httpServer = createServer(app);
    return httpServer;
}

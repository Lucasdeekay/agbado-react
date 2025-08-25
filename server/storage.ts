import {
    type User,
    type InsertUser,
    type ServiceCategory,
    type InsertServiceCategory,
    type Provider,
    type InsertProvider,
    type Product,
    type InsertProduct,
    type CartItem,
    type InsertCartItem,
    type Order,
    type InsertOrder,
    type OrderItem,
    type Booking,
    type InsertBooking
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
    // Users
    getUser(id: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    createUser(user: InsertUser): Promise<User>;

    // Service Categories
    getServiceCategories(): Promise<ServiceCategory[]>;
    createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory>;

    // Providers
    getProviders(): Promise<Provider[]>;
    getProvider(id: string): Promise<Provider | undefined>;
    getProvidersByCategory(category: string): Promise<Provider[]>;
    createProvider(provider: InsertProvider): Promise<Provider>;

    // Products
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product | undefined>;
    getProductsByCategory(category: string): Promise<Product[]>;
    getFeaturedProducts(): Promise<Product[]>;
    createProduct(product: InsertProduct): Promise<Product>;

    // Cart
    getCartItems(userId: string): Promise<CartItem[]>;
    addToCart(cartItem: InsertCartItem): Promise<CartItem>;
    updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
    removeFromCart(id: string): Promise<boolean>;

    // Orders
    getOrders(userId: string): Promise<Order[]>;
    getOrder(id: string): Promise<Order | undefined>;
    createOrder(order: InsertOrder): Promise<Order>;
    getOrderItems(orderId: string): Promise<OrderItem[]>;

    // Bookings
    getBookings(userId: string): Promise<Booking[]>;
    createBooking(booking: InsertBooking): Promise<Booking>;
}

export class MemStorage implements IStorage {
    private users: Map<string, User>;
    private serviceCategories: Map<string, ServiceCategory>;
    private providers: Map<string, Provider>;
    private products: Map<string, Product>;
    private cartItems: Map<string, CartItem>;
    private orders: Map<string, Order>;
    private orderItems: Map<string, OrderItem>;
    private bookings: Map<string, Booking>;

    constructor() {
        this.users = new Map();
        this.serviceCategories = new Map();
        this.providers = new Map();
        this.products = new Map();
        this.cartItems = new Map();
        this.orders = new Map();
        this.orderItems = new Map();
        this.bookings = new Map();

        this.seedData();
    }

    private seedData() {
        // Seed service categories
        const categories: ServiceCategory[] = [
            {
                id: "cat1",
                name: "Home Cleaning",
                description: "Professional home cleaning services",
                icon: "fas fa-home",
                color: "blue",
                startingPrice: 5000
            },
            {
                id: "cat2",
                name: "Repairs",
                description: "Home and appliance repair services",
                icon: "fas fa-tools",
                color: "green",
                startingPrice: 3000
            },
            {
                id: "cat3",
                name: "Beauty",
                description: "Beauty and personal care services",
                icon: "fas fa-cut",
                color: "pink",
                startingPrice: 2500
            },
            {
                id: "cat4",
                name: "Painting",
                description: "Interior and exterior painting",
                icon: "fas fa-paint-brush",
                color: "purple",
                startingPrice: 8000
            },
            {
                id: "cat5",
                name: "Catering",
                description: "Food and catering services",
                icon: "fas fa-utensils",
                color: "orange",
                startingPrice: 15000
            },
            {
                id: "cat6",
                name: "Delivery",
                description: "Package and food delivery",
                icon: "fas fa-truck",
                color: "teal",
                startingPrice: 1500
            }
        ];

        categories.forEach(cat => this.serviceCategories.set(cat.id, cat));

        // Seed providers
        const providers: Provider[] = [
            {
                id: "prov1",
                userId: "user1",
                businessName: "Adebayo Carpentry",
                specialty: "Master Carpenter",
                description: "Expert in custom furniture, cabinet installation, and home woodwork. 15+ years of experience.",
                experience: 15,
                rate: 8000,
                rateType: "per day",
                rating: "4.9",
                reviewCount: 127,
                profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
                workImages: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"],
                serviceAreas: ["Lagos", "Abuja"],
                verified: true
            },
            {
                id: "prov2",
                userId: "user2",
                businessName: "Fatima Hair Studio",
                specialty: "Professional Stylist",
                description: "Specializing in natural hair care, braiding, and modern cuts. Mobile service available.",
                experience: 8,
                rate: 5000,
                rateType: "per session",
                rating: "4.8",
                reviewCount: 89,
                profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b5cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
                workImages: ["https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"],
                serviceAreas: ["Lagos", "Ibadan"],
                verified: true
            },
            {
                id: "prov3",
                userId: "user3",
                businessName: "Chike Electrical",
                specialty: "Licensed Electrician",
                description: "Certified electrical work, installations, and emergency repairs. Quick response time.",
                experience: 12,
                rate: 6000,
                rateType: "per visit",
                rating: "4.9",
                reviewCount: 156,
                profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
                workImages: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"],
                serviceAreas: ["Lagos", "Port Harcourt"],
                verified: true
            }
        ];

        providers.forEach(prov => this.providers.set(prov.id, prov));

        // Seed products
        const products: Product[] = [
            {
                id: "prod1",
                name: "Handwoven Kente Cloth",
                description: "Authentic traditional Kente cloth, handwoven by skilled artisans",
                price: 25000,
                category: "Crafts",
                images: ["https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
                rating: "4.7",
                reviewCount: 23,
                stock: 15,
                sellerId: "user4",
                featured: true
            },
            {
                id: "prod2",
                name: "Bronze Artifacts",
                description: "Handcrafted bronze sculptures inspired by ancient Benin art",
                price: 45000,
                category: "Crafts",
                images: ["https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
                rating: "4.9",
                reviewCount: 12,
                stock: 8,
                sellerId: "user5",
                featured: true
            },
            {
                id: "prod3",
                name: "Beaded Jewelry Set",
                description: "Traditional coral beads necklace and earrings set",
                price: 15000,
                category: "Jewelry",
                images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
                rating: "4.6",
                reviewCount: 34,
                stock: 25,
                sellerId: "user6",
                featured: true
            },
            {
                id: "prod4",
                name: "Carved Wooden Mask",
                description: "Authentic traditional mask carved from premium hardwood",
                price: 35000,
                category: "Crafts",
                images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
                rating: "4.8",
                reviewCount: 18,
                stock: 10,
                sellerId: "user7",
                featured: false
            },
            {
                id: "prod5",
                name: "Traditional Pottery",
                description: "Handcrafted ceramic bowls and decorative pottery",
                price: 12000,
                category: "Home Decor",
                images: ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
                rating: "4.5",
                reviewCount: 28,
                stock: 20,
                sellerId: "user8",
                featured: false
            },
            {
                id: "prod6",
                name: "Ankara Fabric",
                description: "Premium quality Ankara fabric in various vibrant patterns",
                price: 8000,
                category: "Clothing",
                images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
                rating: "4.4",
                reviewCount: 42,
                stock: 50,
                sellerId: "user9",
                featured: false
            },
            {
                id: "prod7",
                name: "Traditional Drum",
                description: "Authentic djembe drum handcrafted by master artisans",
                price: 28000,
                category: "Music",
                images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
                rating: "4.7",
                reviewCount: 16,
                stock: 12,
                sellerId: "user10",
                featured: false
            },
            {
                id: "prod8",
                name: "Woven Baskets",
                description: "Set of handwoven storage baskets in various sizes",
                price: 18000,
                category: "Home Decor",
                images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
                rating: "4.6",
                reviewCount: 31,
                stock: 18,
                sellerId: "user11",
                featured: false
            }
        ];

        products.forEach(prod => this.products.set(prod.id, prod));
    }

    // User methods
    async getUser(id: string): Promise<User | undefined> {
        return this.users.get(id);
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        return Array.from(this.users.values()).find(user => user.username === username);
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return Array.from(this.users.values()).find(user => user.email === email);
    }

    async createUser(insertUser: InsertUser): Promise<User> {
        const id = randomUUID();
        const user: User = {
            ...insertUser,
            id,
            createdAt: new Date()
        };
        this.users.set(id, user);
        return user;
    }

    // Service Category methods
    async getServiceCategories(): Promise<ServiceCategory[]> {
        return Array.from(this.serviceCategories.values());
    }

    async createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory> {
        const id = randomUUID();
        const serviceCategory: ServiceCategory = { ...category, id };
        this.serviceCategories.set(id, serviceCategory);
        return serviceCategory;
    }

    // Provider methods
    async getProviders(): Promise<Provider[]> {
        return Array.from(this.providers.values());
    }

    async getProvider(id: string): Promise<Provider | undefined> {
        return this.providers.get(id);
    }

    async getProvidersByCategory(category: string): Promise<Provider[]> {
        return Array.from(this.providers.values()).filter(provider =>
            provider.specialty.toLowerCase().includes(category.toLowerCase())
        );
    }

    async createProvider(provider: InsertProvider): Promise<Provider> {
        const id = randomUUID();
        const newProvider: Provider = { ...provider, id };
        this.providers.set(id, newProvider);
        return newProvider;
    }

    // Product methods
    async getProducts(): Promise<Product[]> {
        return Array.from(this.products.values());
    }

    async getProduct(id: string): Promise<Product | undefined> {
        return this.products.get(id);
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        return Array.from(this.products.values()).filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }

    async getFeaturedProducts(): Promise<Product[]> {
        return Array.from(this.products.values()).filter(product => product.featured);
    }

    async createProduct(product: InsertProduct): Promise<Product> {
        const id = randomUUID();
        const newProduct: Product = { ...product, id };
        this.products.set(id, newProduct);
        return newProduct;
    }

    // Cart methods
    async getCartItems(userId: string): Promise<CartItem[]> {
        return Array.from(this.cartItems.values()).filter(item => item.userId === userId);
    }

    async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
        const id = randomUUID();
        const newCartItem: CartItem = { ...cartItem, id };
        this.cartItems.set(id, newCartItem);
        return newCartItem;
    }

    async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
        const item = this.cartItems.get(id);
        if (item) {
            item.quantity = quantity;
            this.cartItems.set(id, item);
            return item;
        }
        return undefined;
    }

    async removeFromCart(id: string): Promise<boolean> {
        return this.cartItems.delete(id);
    }

    // Order methods
    async getOrders(userId: string): Promise<Order[]> {
        return Array.from(this.orders.values()).filter(order => order.userId === userId);
    }

    async getOrder(id: string): Promise<Order | undefined> {
        return this.orders.get(id);
    }

    async createOrder(order: InsertOrder): Promise<Order> {
        const id = randomUUID();
        const newOrder: Order = {
            ...order,
            id,
            createdAt: new Date()
        };
        this.orders.set(id, newOrder);
        return newOrder;
    }

    async getOrderItems(orderId: string): Promise<OrderItem[]> {
        return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
    }

    // Booking methods
    async getBookings(userId: string): Promise<Booking[]> {
        return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
    }

    async createBooking(booking: InsertBooking): Promise<Booking> {
        const id = randomUUID();
        const newBooking: Booking = {
            ...booking,
            id,
            createdAt: new Date()
        };
        this.bookings.set(id, newBooking);
        return newBooking;
    }
}

export const storage = new MemStorage();

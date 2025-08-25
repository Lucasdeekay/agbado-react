import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  city: text("city"),
  isProvider: boolean("is_provider").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

export const serviceCategories = pgTable("service_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  startingPrice: integer("starting_price").notNull()
});

export const providers = pgTable("providers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  businessName: text("business_name").notNull(),
  specialty: text("specialty").notNull(),
  description: text("description").notNull(),
  experience: integer("experience").notNull(),
  rate: integer("rate").notNull(),
  rateType: text("rate_type").notNull(), // per day, per hour, per session, per visit
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  reviewCount: integer("review_count").default(0),
  profileImage: text("profile_image"),
  workImages: text("work_images").array(),
  serviceAreas: text("service_areas").array(),
  verified: boolean("verified").default(false)
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  images: text("images").array(),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  reviewCount: integer("review_count").default(0),
  stock: integer("stock").default(0),
  sellerId: varchar("seller_id").references(() => users.id).notNull(),
  featured: boolean("featured").default(false)
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  productId: varchar("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull().default(1)
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  total: integer("total").notNull(),
  status: text("status").notNull().default("pending"),
  shippingAddress: text("shipping_address").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id).notNull(),
  productId: varchar("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull()
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  providerId: varchar("provider_id").references(() => providers.id).notNull(),
  serviceDescription: text("service_description").notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  status: text("status").notNull().default("pending"),
  totalCost: integer("total_cost").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});

export const insertServiceCategorySchema = createInsertSchema(serviceCategories).omit({
  id: true
});

export const insertProviderSchema = createInsertSchema(providers).omit({
  id: true
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ServiceCategory = typeof serviceCategories.$inferSelect;
export type InsertServiceCategory = z.infer<typeof insertServiceCategorySchema>;

export type Provider = typeof providers.$inferSelect;
export type InsertProvider = z.infer<typeof insertProviderSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type OrderItem = typeof orderItems.$inferSelect;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

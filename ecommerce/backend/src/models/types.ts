export interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserDTO;
}

export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  children?: CategoryDTO[];
}

export interface ProductVariantDTO {
  id: string;
  productId: string;
  sku: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  stockAvailable: number;
  imageUrl?: string;
}

export interface ProductDTO {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  currency: string;
  isTaxable: boolean;
  weightGrams: number;
  categories: CategoryDTO[];
  variants: ProductVariantDTO[];
  images: { id: string; url: string; isPrimary: boolean }[];
  averageRating: number;
  reviewCount: number;
}

export interface ProductQueryFilter {
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  inStockOnly?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'created_at' | 'rating';
  page?: number;
  limit?: number;
}

export interface CartItemDTO {
  id: string;
  variantId: string;
  productName: string;
  variantTitle: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  itemSubtotal: number;
  imageUrl?: string;
}

export interface CartDTO {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItemDTO[];
  subtotal: number;
  discountTotal: number;
  couponCode?: string;
  estimatedTax: number;
  estimatedShipping: number;
  grandTotal: number;
}

export interface CreateOrderRequest {
  cartId: string;
  shippingAddressId: string;
  billingAddressId: string;
  customerNotes?: string;
  paymentMethod: 'STRIPE' | 'PAYPAL' | 'CASH_ON_DELIVERY';
}

export interface OrderDTO {
  id: string;
  orderNumber: string;
  userId: string;
  status: string;
  items: {
    productName: string;
    variantTitle: string;
    sku: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
  }[];
  subtotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  grandTotal: number;
  currency: string;
  createdAt: Date;
}

export interface ProcessPaymentRequest {
  orderId: string;
  paymentProvider: 'STRIPE' | 'PAYPAL';
  paymentToken: string;
  amount: number;
}

export interface PaymentResultDTO {
  success: boolean;
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  gatewayRawResponse?: string;
  errorMessage?: string;
}

export interface AnalyticsSummaryDTO {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCustomers: number;
  lowStockItemsCount: number;
  conversionRate: number;
  recentOrders: OrderDTO[];
}

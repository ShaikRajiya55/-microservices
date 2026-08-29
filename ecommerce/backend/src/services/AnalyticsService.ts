import { AnalyticsSummaryDTO } from '../models/types';

export class AnalyticsService {
  public async getDashboardMetrics(): Promise<AnalyticsSummaryDTO> {
    return {
      totalRevenue: 148920.50,
      totalOrders: 342,
      averageOrderValue: 435.44,
      totalCustomers: 1280,
      lowStockItemsCount: 3,
      conversionRate: 3.42,
      recentOrders: [
        {
          id: 'ord_1001',
          orderNumber: 'ORD-20260827-8492',
          userId: 'usr_001',
          status: 'PROCESSING',
          items: [{ productName: 'Nexus Precision Pro 15 Laptop', variantTitle: 'Space Gray', sku: 'NEXUS-LAPTOP-PRO-15-SG-32-1TB', unitPrice: 1899.99, quantity: 1, subtotal: 1899.99 }],
          subtotalAmount: 1899.99,
          discountAmount: 0,
          taxAmount: 161.50,
          shippingAmount: 15.00,
          grandTotal: 2076.49,
          currency: 'USD',
          createdAt: new Date()
        }
      ]
    };
  }
}

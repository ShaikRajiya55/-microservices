import { describe, it, expect } from 'vitest';
import { CatalogService } from '../../backend/src/services/CatalogService';

describe('Test Case 2: CatalogService - Product Filtering & Search Indexing', () => {
  const catalogService = new CatalogService();

  it('should retrieve catalog products matching search terms', async () => {
    const result = await catalogService.getProducts({ searchQuery: 'Laptop' });
    expect(result.products.length).toBeGreaterThan(0);
    expect(result.products[0].name).toContain('Laptop');
  });

  it('should filter product catalog within price ranges', async () => {
    const result = await catalogService.getProducts({ minPrice: 1500, maxPrice: 2000 });
    expect(result.products.every(p => p.basePrice >= 1500 && p.basePrice <= 2000)).toBe(true);
  });

  it('should resolve product details by slug', async () => {
    const product = await catalogService.getProductBySlug('nexus-precision-pro-15');
    expect(product.sku).toBe('NEXUS-LAPTOP-PRO-15');
    expect(product.variants.length).toBeGreaterThan(0);
  });
});

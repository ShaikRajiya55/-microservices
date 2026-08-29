import { ProductDTO, ProductQueryFilter, CategoryDTO } from '../models/types';
import { NotFoundError } from '../core/Errors';
import { StringUtils } from '../utils/stringUtils';

export class CatalogService {
  private products: ProductDTO[] = [
    {
      id: 'prod_laptop_01',
      name: 'Nexus Precision Pro 15 Laptop',
      slug: 'nexus-precision-pro-15',
      sku: 'NEXUS-LAPTOP-PRO-15',
      description: 'Ultra-thin creator laptop with 32GB RAM, 1TB NVMe SSD, OLED 4K Display.',
      basePrice: 1899.99,
      compareAtPrice: 2099.99,
      currency: 'USD',
      isTaxable: true,
      weightGrams: 1850,
      categories: [{ id: 'cat_laptops', name: 'Laptops & Computers', slug: 'laptops' }],
      variants: [
        {
          id: 'var_01_sg',
          productId: 'prod_laptop_01',
          sku: 'NEXUS-LAPTOP-PRO-15-SG-32-1TB',
          title: 'Space Gray / 32GB RAM / 1TB SSD',
          price: 1899.99,
          compareAtPrice: 2099.99,
          stockAvailable: 45,
          imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'var_01_sl',
          productId: 'prod_laptop_01',
          sku: 'NEXUS-LAPTOP-PRO-15-SL-64-2TB',
          title: 'Silver / 64GB RAM / 2TB SSD',
          price: 2399.99,
          compareAtPrice: 2599.99,
          stockAvailable: 18,
          imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
        }
      ],
      images: [
        { id: 'img_01', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', isPrimary: true },
        { id: 'img_02', url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80', isPrimary: false }
      ],
      averageRating: 4.8,
      reviewCount: 34
    },
    {
      id: 'prod_phone_02',
      name: 'Nexus Horizon Phone Ultra',
      slug: 'nexus-horizon-phone-ultra',
      sku: 'NEXUS-PHONE-ULTRA',
      description: 'Next-generation smartphone with 200MP camera system, 5000mAh battery, AI processing.',
      basePrice: 999.99,
      compareAtPrice: 1149.99,
      currency: 'USD',
      isTaxable: true,
      weightGrams: 220,
      categories: [{ id: 'cat_phones', name: 'Smartphones & Mobile', slug: 'smartphones' }],
      variants: [
        {
          id: 'var_02_blk',
          productId: 'prod_phone_02',
          sku: 'NEXUS-PHONE-ULTRA-BLK',
          title: 'Phantom Black / 256GB',
          price: 999.99,
          stockAvailable: 120,
          imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80'
        }
      ],
      images: [
        { id: 'img_03', url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80', isPrimary: true }
      ],
      averageRating: 4.9,
      reviewCount: 88
    }
  ];

  public async getProducts(filter: ProductQueryFilter = {}): Promise<{ products: ProductDTO[]; total: number }> {
    let result = [...this.products];

    if (filter.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (filter.minPrice !== undefined) {
      result = result.filter(p => p.basePrice >= filter.minPrice!);
    }

    if (filter.maxPrice !== undefined) {
      result = result.filter(p => p.basePrice <= filter.maxPrice!);
    }

    return { products: result, total: result.length };
  }

  public async getProductBySlug(slug: string): Promise<ProductDTO> {
    const prod = this.products.find(p => p.slug === slug);
    if (!prod) {
      throw new NotFoundError('Product', slug);
    }
    return prod;
  }
}

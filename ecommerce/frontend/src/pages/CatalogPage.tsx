import React, { useState } from 'react';
import { ProductDTO } from '../../backend/src/models/types';
import { useCartStore } from '../store/useCartStore';

const MOCK_PRODUCTS: ProductDTO[] = [
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
        stockAvailable: 45,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
      }
    ],
    images: [
      { id: 'img_01', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', isPrimary: true }
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

export const CatalogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCartStore();

  const filteredProducts = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '0 32px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', gap: '16px' }}>
        <input
          type="text"
          placeholder="Search products by name or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <img
              src={product.images[0]?.url}
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
            />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{product.name}</h3>
            <p style={{ color: '#64748b', fontSize: '14px', flex: 1 }}>{product.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#2563eb' }}>
                ${product.basePrice.toFixed(2)}
              </span>
              <button
                className="btn-primary"
                onClick={() => {
                  const variant = product.variants[0];
                  addItem({
                    id: 'ci_' + Date.now(),
                    variantId: variant.id,
                    productName: product.name,
                    variantTitle: variant.title,
                    sku: variant.sku,
                    unitPrice: variant.price,
                    quantity: 1,
                    itemSubtotal: variant.price,
                    imageUrl: variant.imageUrl
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { PrismaClient, RoleName } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding NexusCart database...');

  // Create Roles
  const roles = [
    { name: RoleName.SUPER_ADMIN, description: 'Super Administrator with full privileges' },
    { name: RoleName.ADMIN, description: 'Store Administrator' },
    { name: RoleName.CATALOG_MANAGER, description: 'Manages products, categories, and brands' },
    { name: RoleName.INVENTORY_MANAGER, description: 'Manages stock levels and warehouse operations' },
    { name: RoleName.CUSTOMER_SERVICE, description: 'Handles order status and customer inquiries' },
    { name: RoleName.CUSTOMER, description: 'Standard registered store customer' }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role
    });
  }

  // Create Sample Categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Gadgets, devices, and consumer electronics'
    }
  });

  const laptops = await prisma.category.upsert({
    where: { slug: 'laptops' },
    update: {},
    create: {
      name: 'Laptops & Computers',
      slug: 'laptops',
      parentId: electronics.id,
      description: 'High performance gaming, workstation, and ultra-light laptops'
    }
  });

  // Create Sample Brand
  const techBrand = await prisma.brand.upsert({
    where: { slug: 'nexus-tech' },
    update: {},
    create: {
      name: 'NexusTech',
      slug: 'nexus-tech',
      description: 'Premium futuristic computing equipment'
    }
  });

  // Create Sample Product
  const laptopProduct = await prisma.product.upsert({
    where: { sku: 'NEXUS-LAPTOP-PRO-15' },
    update: {},
    create: {
      brandId: techBrand.id,
      name: 'Nexus Precision Pro 15 Laptop',
      slug: 'nexus-precision-pro-15',
      sku: 'NEXUS-LAPTOP-PRO-15',
      description: 'Ultimate developer and creator laptop with 32GB RAM, 1TB SSD, and 12-core CPU.',
      summary: 'High performance creator workstation laptop.',
      basePrice: 1899.99,
      compareAtPrice: 2099.99,
      weightGrams: 1850.0,
      categories: {
        create: { categoryId: laptops.id }
      },
      variants: {
        create: [
          {
            title: 'Space Gray / 32GB RAM / 1TB SSD',
            sku: 'NEXUS-LAPTOP-PRO-15-SG-32-1TB',
            price: 1899.99,
            weightGrams: 1850.0
          },
          {
            title: 'Silver / 64GB RAM / 2TB SSD',
            sku: 'NEXUS-LAPTOP-PRO-15-SL-64-2TB',
            price: 2399.99,
            weightGrams: 1900.0
          }
        ]
      }
    }
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

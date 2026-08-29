# NexusCart Enterprise Platform Architecture Spec

## System Architecture Diagram
```
+-----------------------------------------------------------------------+
|                           Client Layer                                |
|   Customer Web App (React/Next.js) | Admin Portal (Dashboard Console)  |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                        API Gateway / Router                           |
|      Express.js Framework + Rate Limiter + JWT Security Guard         |
+-----------------------------------------------------------------------+
                                   |
      +----------------------------+----------------------------+
      |                            |                            |
      v                            v                            v
+------------------+     +------------------+     +------------------+
|   Auth Service   |     | Catalog Service  |     | Cart & Checkout  |
+------------------+     +------------------+     +------------------+
      |                            |                            |
      v                            v                            v
+------------------+     +------------------+     +------------------+
| Payment Service  |     | Inventory System |     | Analytics Engine |
+------------------+     +------------------+     +------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    Persistence & State Storage                        |
|       SQLite / PostgreSQL Database (Prisma ORM) | Redis Cache         |
+-----------------------------------------------------------------------+
```

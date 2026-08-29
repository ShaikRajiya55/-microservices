import { Request, Response, NextFunction } from 'express';
import { CatalogService } from '../services/CatalogService';

export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filter = {
        searchQuery: req.query.q as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined
      };
      const result = await this.catalogService.getProducts(filter);
      res.status(200).json({ success: true, data: result.products, total: result.total });
    } catch (err) {
      next(err);
    }
  };

  public getProductBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product = await this.catalogService.getProductBySlug(req.params.slug);
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  };
}

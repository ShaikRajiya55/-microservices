import { AppError } from '../core/Errors';

export class InventoryService {
  private stockMap: Map<string, number> = new Map([
    ['var_01_sg', 45],
    ['var_01_sl', 18],
    ['var_02_blk', 120]
  ]);

  public async checkAvailability(variantId: string, requestedQty: number): Promise<boolean> {
    const currentStock = this.stockMap.get(variantId) || 0;
    return currentStock >= requestedQty;
  }

  public async reserveStock(variantId: string, qty: number): Promise<void> {
    const current = this.stockMap.get(variantId) || 0;
    if (current < qty) {
      throw new AppError(`Insufficient stock reservation capacity for variant '${variantId}'`, 400);
    }
    this.stockMap.set(variantId, current - qty);
  }
}

import { Product } from './products.interface';
import { User } from './users.interface';

export enum SaleStatus {
  SALE_CREATED = 'CREATED',
  SALE_MODIFIED = 'MODIFIED',
  SALE_CANCELLED = 'CANCELLED',
  ITEM_CANCELLED = 'CANCELLED',
}

export interface SaleProduct {
  productId: string;
  quantity: number;
  discount: number;
  totalPrice: number;
}

export interface SaleRequest {
  customerID: string;
  products: SaleProduct[];
}

export interface Sales {
  SaleId: string;
  name: string;
  unitPrice: number;
  totalValue: number;
  discounts: number;
  quantities: number;
  total: number;
  customer: User;
  products: Product[];
  status: SaleStatus;
}

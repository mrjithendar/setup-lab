import { Checkout } from '../../../../types';
export declare class ScLineItemTotal {
  total: 'total' | 'subtotal';
  size: 'large' | 'medium';
  checkout: Checkout;
  order_key: {
    total: string;
    subtotal: string;
    amount_due: string;
  };
  render(): any;
}

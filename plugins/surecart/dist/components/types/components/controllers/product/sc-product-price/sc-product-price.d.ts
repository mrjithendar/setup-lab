import { Price, Variant } from '../../../../types';
export declare class ScProductPrice {
  /** The prices list */
  prices: Price[];
  /** The sale text */
  saleText: string;
  renderRange(): any;
  renderVariantPrice(selectedVariant: Variant): any;
  renderPrice(price: Price, variantAmount?: number): any;
  render(): any;
}

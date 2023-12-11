import { ProductMedia } from '../../../../types';
export declare class ScProductItemImage {
  productMedia: ProductMedia;
  alt: string;
  sizing: 'cover' | 'contain';
  getSrc(): string;
  render(): any;
}

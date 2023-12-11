import { LineItemData } from 'src/types';
import { Price, Product, VariantOption, Variant } from 'src/types';
interface Store {
  formId: number;
  mode: 'live' | 'test';
  product: Product;
  prices: Price[];
  variants: Variant[];
  variant_options: VariantOption[];
  quantity: number;
  selectedPrice: Price;
  total: number;
  busy: boolean;
  disabled: boolean;
  checkoutUrl: string;
  adHocAmount: number;
  dialog: string;
  line_item: LineItemData;
  error: string;
  selectedVariant?: Variant;
  variantValues: {
    option_1?: string;
    option_2?: string;
    option_3?: string;
  };
}
declare const state: Store, onChange: import("@stencil/store/dist/types").OnChangeHandler<Store>, on: import("@stencil/store/dist/types").OnHandler<Store>, dispose: () => void, forceUpdate: (key: keyof Store) => any;
export default state;
export { state, onChange, on, dispose, forceUpdate };

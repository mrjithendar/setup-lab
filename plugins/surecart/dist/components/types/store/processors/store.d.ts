import { ManualPaymentMethod, PaymentMethodType, Processor } from '../../types';
interface Store {
  processors: Processor[];
  methods: PaymentMethodType[];
  manualPaymentMethods: ManualPaymentMethod[];
  disabled: {
    processors: string[];
  };
  sortOrder: {
    processors: string[];
    manualPaymentMethods: string[];
    paymentMethods: {
      mollie: string[];
    };
  };
  config: {
    stripe: {
      paymentElement: boolean;
    };
  };
}
declare const state: Store, onChange: import("@stencil/store/dist/types").OnChangeHandler<Store>, on: import("@stencil/store/dist/types").OnHandler<Store>, dispose: () => void;
export default state;
export { state, onChange, on, dispose };

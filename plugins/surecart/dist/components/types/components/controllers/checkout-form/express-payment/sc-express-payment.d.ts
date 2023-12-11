import { Checkout, ProcessorName } from '../../../../types';
export declare class ScExpressPayment {
  processor: ProcessorName;
  formId: number | string;
  busy: boolean;
  order: Checkout;
  dividerText: string;
  debug: boolean;
  hasPaymentOptions: boolean;
  onPaymentRequestLoaded(): void;
  renderStripePaymentRequest(): any;
  render(): any;
}

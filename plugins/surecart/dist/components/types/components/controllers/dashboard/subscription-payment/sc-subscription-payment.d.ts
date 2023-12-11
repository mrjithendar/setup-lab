import { PaymentMethod, Subscription } from '../../../../types';
export declare class ScSubscriptionPayment {
  subscriptionId: string;
  backUrl: string;
  successUrl: string;
  subscription: Subscription;
  paymentMethods: Array<PaymentMethod>;
  customerIds: Array<string>;
  loading: boolean;
  busy: boolean;
  error: string;
  componentWillLoad(): void;
  fetchItems(): Promise<void>;
  fetchSubscription(): Promise<void>;
  fetchPaymentMethods(): Promise<void>;
  handleSubmit(e: any): Promise<void>;
  renderLoading(): any;
  renderContent(): any;
  render(): any;
}

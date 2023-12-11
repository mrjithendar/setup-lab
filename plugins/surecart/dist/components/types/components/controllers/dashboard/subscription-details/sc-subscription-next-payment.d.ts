import { Period, ResponseError, Subscription } from '../../../../types';
export declare class ScSubscriptionNextPayment {
  subscription: Subscription;
  period: Period;
  loading: boolean;
  error: ResponseError;
  details: boolean;
  componentWillLoad(): void;
  handleSubscriptionChange(): void;
  fetch(): Promise<void>;
  render(): any;
}

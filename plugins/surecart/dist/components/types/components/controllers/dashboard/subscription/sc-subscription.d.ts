import { Subscription, SubscriptionProtocol } from '../../../../types';
export declare class ScSubscription {
  el: HTMLScSubscriptionsListElement;
  /** Customer id to fetch subscriptions */
  subscriptionId: string;
  showCancel: boolean;
  heading: string;
  query: object;
  protocol: SubscriptionProtocol;
  subscription: Subscription;
  /** Loading state */
  loading: boolean;
  /** Cancel modal */
  cancelModal: boolean;
  /**  Busy state */
  busy: boolean;
  /** Error message */
  error: string;
  componentWillLoad(): void;
  cancelPendingUpdate(): Promise<void>;
  renewSubscription(): Promise<void>;
  /** Get all subscriptions */
  getSubscription(): Promise<void>;
  renderName(subscription: Subscription): string;
  renderRenewalText(subscription: any): any;
  renderEmpty(): any;
  renderLoading(): any;
  renderContent(): any;
  render(): any;
}

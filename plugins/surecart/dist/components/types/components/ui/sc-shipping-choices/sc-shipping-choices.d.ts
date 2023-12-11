export declare class ScShippingChoices {
  /** The shipping section label */
  label: string;
  /** Whether to show the shipping choice description */
  showDescription: boolean;
  /** Maybe update the order. */
  updateCheckout(selectedShippingChoiceId: string): Promise<void>;
  render(): any;
}

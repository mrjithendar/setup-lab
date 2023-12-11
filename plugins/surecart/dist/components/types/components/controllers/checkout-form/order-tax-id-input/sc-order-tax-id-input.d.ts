export declare class ScOrderTaxIdInput {
  /** The tax id input */
  private input;
  /** Force show the field. */
  show: boolean;
  /** Other zones label */
  otherLabel: string;
  /** GST zone label */
  caGstLabel: string;
  /** AU zone label */
  auAbnLabel: string;
  /** UK zone label */
  gbVatLabel: string;
  /** EU zone label */
  euVatLabel: string;
  reportValidity(): Promise<boolean>;
  getStatus(): "invalid" | "unknown" | "valid";
  updateOrder(tax_identifier: {
    number: string;
    number_type: string;
  }): Promise<void>;
  required(): boolean;
  render(): any;
}

import { EventEmitter } from '../../../../stencil-public-runtime';
import { Address, Checkout, TaxStatus } from '../../../../types';
export declare class ScOrderShippingAddress {
  private input;
  /** Label for the field. */
  label: string;
  /** Is this required (defaults to false) */
  required: boolean;
  /** Is this loading. */
  loading: boolean;
  /** Holds the customer's billing address */
  shippingAddress: Address;
  /** Tax status of the order */
  taxStatus: TaxStatus;
  /** Tax enabled status of the order */
  taxEnabled: boolean;
  /** Is shipping enabled for this order? */
  shippingEnabled: boolean;
  /** Show the   address */
  full: boolean;
  /** Show the name field. */
  showName: boolean;
  /** Show the placeholder fields. */
  namePlaceholder: string;
  countryPlaceholder: string;
  cityPlaceholder: string;
  line1Placeholder: string;
  line2Placeholder: string;
  postalCodePlaceholder: string;
  statePlaceholder: string;
  /** Default country for address */
  defaultCountry: string;
  /** Whether to require the name in the address */
  requireName: boolean;
  /** Placeholder values. */
  placeholders: Partial<Address>;
  /** Make a request to update the order. */
  scUpdateOrder: EventEmitter<{
    data: Partial<Checkout>;
    options?: {
      silent?: boolean;
    };
  }>;
  /** Address to pass to the component */
  address: Partial<Address>;
  /** When the shipping address changes, we want to use that instead of what's entered, if we have empty fields. */
  handleCustomerAddressChange(val: any, old: any): void;
  updateAddressState(address: Partial<Address>): Promise<void>;
  reportValidity(): Promise<boolean>;
  componentWillLoad(): void;
  handleRequirementChange(): void;
  handleNameChange(): void;
  render(): any;
}

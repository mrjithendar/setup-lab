import { Activation, License } from '../../../../types';
export declare class ScLicensesList {
  licenses: License[];
  activations: Activation[];
  heading: string;
  copied: boolean;
  renderStatus(status: any): any;
  copyKey(key: string): Promise<void>;
  render(): any;
}

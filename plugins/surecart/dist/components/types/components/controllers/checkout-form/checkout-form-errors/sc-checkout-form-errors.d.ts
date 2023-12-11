/**
 * This component listens for a confirmed event and redirects to the success url.
 */
export declare class ScCheckoutFormErrors {
  private removeStateListener;
  /**
   * Get the alert type.
   * @returns string
   */
  getAlertType(): "danger" | "primary" | "success" | "info" | "warning";
  componentWillLoad(): void;
  disconnectedCallback(): void;
  getTopLevelError(): string;
  render(): any;
}

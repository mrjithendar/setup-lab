export declare class ScProductBuyButton {
  el: HTMLScProductBuyButtonElement;
  addToCart: boolean;
  handleCartClick(e: any): void | "ad_hoc_cart" | "ad_hoc_buy";
  private link;
  componentDidLoad(): void;
  updateProductLink(): void;
  render(): any;
}

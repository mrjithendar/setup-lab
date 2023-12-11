import { r as registerInstance, h, H as Host, a as getElement } from './index-644f5478.js';
import { s as state, o as onChange, i as isProductOutOfStock, b as isSelectedVariantMissing } from './watchers-07474b8e.js';
import { g as getProductBuyLink, s as submitCartForm } from './mutations-c4f48044.js';
import './index-1046c77e.js';
import './util-60cd51cc.js';
import './utils-f20e895e.js';
import './index-d873f782.js';
import './google-db792dd1.js';
import './currency-4692aeb2.js';
import './add-query-args-f4c5962b.js';
import './get-query-arg-cb6b8763.js';
import './watchers-cfaf7553.js';
import './watchers-f761bdb6.js';
import './getters-d70b464d.js';
import './fetch-2525e763.js';
import './ui-20706656.js';

const scProductBuyButtonCss = "sc-product-buy-button{position:relative}sc-product-buy-button a.wp-block-button__link{position:relative;text-decoration:none}sc-product-buy-button .sc-block-button--sold-out,sc-product-buy-button .sc-block-button--unavailable{display:none !important}sc-product-buy-button.is-unavailable a{display:none !important}sc-product-buy-button.is-unavailable .sc-block-button--unavailable{display:initial !important}sc-product-buy-button.is-sold-out a{display:none !important}sc-product-buy-button.is-sold-out .sc-block-button--sold-out{display:initial !important}sc-product-buy-button sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-product-buy-button [data-text],sc-product-buy-button [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-product-buy-button [data-loader]{opacity:0;visibility:hidden}sc-product-buy-button.is-disabled{pointer-events:none}sc-product-buy-button.is-busy [data-text]{opacity:0;visibility:hidden}sc-product-buy-button.is-busy [data-loader]{opacity:1;visibility:visible}sc-product-buy-button.is-out-of-stock [data-text]{opacity:0.6}";

const ScProductBuyButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.addToCart = undefined;
  }
  handleCartClick(e) {
    var _a, _b, _c;
    e.preventDefault();
    // already busy, do nothing.
    if (state.busy)
      return;
    // ad hoc price, use the dialog.
    if ((_a = state === null || state === void 0 ? void 0 : state.selectedPrice) === null || _a === void 0 ? void 0 : _a.ad_hoc) {
      return (state.dialog = this.addToCart ? 'ad_hoc_cart' : 'ad_hoc_buy');
    }
    // if add to cart is undefined/false navigate to buy url
    if (!this.addToCart) {
      const checkoutUrl = (_c = (_b = window === null || window === void 0 ? void 0 : window.scData) === null || _b === void 0 ? void 0 : _b.pages) === null || _c === void 0 ? void 0 : _c.checkout;
      if (!checkoutUrl)
        return;
      return window.location.assign(getProductBuyLink(checkoutUrl, { no_cart: !this.addToCart }));
    }
    // submit the cart form.
    submitCartForm();
  }
  componentDidLoad() {
    this.link = this.el.querySelector('a');
    this.updateProductLink();
    onChange('selectedPrice', () => this.updateProductLink());
    onChange('selectedVariant', () => this.updateProductLink());
  }
  updateProductLink() {
    var _a, _b;
    const checkoutUrl = (_b = (_a = window === null || window === void 0 ? void 0 : window.scData) === null || _a === void 0 ? void 0 : _a.pages) === null || _b === void 0 ? void 0 : _b.checkout;
    if (!checkoutUrl || !this.link)
      return;
    this.link.href = getProductBuyLink(checkoutUrl, !this.addToCart ? { no_cart: true } : {});
  }
  render() {
    return (h(Host, { class: {
        'is-busy': state.busy && !!this.addToCart,
        'is-disabled': state.disabled,
        'is-sold-out': isProductOutOfStock() && !isSelectedVariantMissing(),
        'is-unavailable': isSelectedVariantMissing(),
      }, onClick: e => this.handleCartClick(e) }, h("slot", null)));
  }
  get el() { return getElement(this); }
};
ScProductBuyButton.style = scProductBuyButtonCss;

export { ScProductBuyButton as sc_product_buy_button };

//# sourceMappingURL=sc-product-buy-button.entry.js.map
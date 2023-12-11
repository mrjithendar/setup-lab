'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-57356c46.js');
const mutations = require('./mutations-a2e43c56.js');
require('./index-00f0fc21.js');
require('./util-9c366e9f.js');
require('./utils-45815a15.js');
require('./index-e302f7c9.js');
require('./google-13aecc85.js');
require('./currency-2733c607.js');
require('./add-query-args-17c551b6.js');
require('./get-query-arg-53bf21e2.js');
require('./watchers-eeca9c2e.js');
require('./watchers-d7bdd741.js');
require('./getters-a4757e13.js');
require('./fetch-2dba325c.js');
require('./ui-aaeb2895.js');

const scProductBuyButtonCss = "sc-product-buy-button{position:relative}sc-product-buy-button a.wp-block-button__link{position:relative;text-decoration:none}sc-product-buy-button .sc-block-button--sold-out,sc-product-buy-button .sc-block-button--unavailable{display:none !important}sc-product-buy-button.is-unavailable a{display:none !important}sc-product-buy-button.is-unavailable .sc-block-button--unavailable{display:initial !important}sc-product-buy-button.is-sold-out a{display:none !important}sc-product-buy-button.is-sold-out .sc-block-button--sold-out{display:initial !important}sc-product-buy-button sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-product-buy-button [data-text],sc-product-buy-button [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-product-buy-button [data-loader]{opacity:0;visibility:hidden}sc-product-buy-button.is-disabled{pointer-events:none}sc-product-buy-button.is-busy [data-text]{opacity:0;visibility:hidden}sc-product-buy-button.is-busy [data-loader]{opacity:1;visibility:visible}sc-product-buy-button.is-out-of-stock [data-text]{opacity:0.6}";

const ScProductBuyButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.addToCart = undefined;
  }
  handleCartClick(e) {
    var _a, _b, _c;
    e.preventDefault();
    // already busy, do nothing.
    if (watchers.state.busy)
      return;
    // ad hoc price, use the dialog.
    if ((_a = watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.selectedPrice) === null || _a === void 0 ? void 0 : _a.ad_hoc) {
      return (watchers.state.dialog = this.addToCart ? 'ad_hoc_cart' : 'ad_hoc_buy');
    }
    // if add to cart is undefined/false navigate to buy url
    if (!this.addToCart) {
      const checkoutUrl = (_c = (_b = window === null || window === void 0 ? void 0 : window.scData) === null || _b === void 0 ? void 0 : _b.pages) === null || _c === void 0 ? void 0 : _c.checkout;
      if (!checkoutUrl)
        return;
      return window.location.assign(mutations.getProductBuyLink(checkoutUrl, { no_cart: !this.addToCart }));
    }
    // submit the cart form.
    mutations.submitCartForm();
  }
  componentDidLoad() {
    this.link = this.el.querySelector('a');
    this.updateProductLink();
    watchers.onChange('selectedPrice', () => this.updateProductLink());
    watchers.onChange('selectedVariant', () => this.updateProductLink());
  }
  updateProductLink() {
    var _a, _b;
    const checkoutUrl = (_b = (_a = window === null || window === void 0 ? void 0 : window.scData) === null || _a === void 0 ? void 0 : _a.pages) === null || _b === void 0 ? void 0 : _b.checkout;
    if (!checkoutUrl || !this.link)
      return;
    this.link.href = mutations.getProductBuyLink(checkoutUrl, !this.addToCart ? { no_cart: true } : {});
  }
  render() {
    return (index.h(index.Host, { class: {
        'is-busy': watchers.state.busy && !!this.addToCart,
        'is-disabled': watchers.state.disabled,
        'is-sold-out': watchers.isProductOutOfStock() && !watchers.isSelectedVariantMissing(),
        'is-unavailable': watchers.isSelectedVariantMissing(),
      }, onClick: e => this.handleCartClick(e) }, index.h("slot", null)));
  }
  get el() { return index.getElement(this); }
};
ScProductBuyButton.style = scProductBuyButtonCss;

exports.sc_product_buy_button = ScProductBuyButton;

//# sourceMappingURL=sc-product-buy-button.cjs.entry.js.map
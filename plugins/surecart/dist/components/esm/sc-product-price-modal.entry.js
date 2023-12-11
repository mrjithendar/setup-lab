import { r as registerInstance, h, a as getElement } from './index-644f5478.js';
import { o as onChange, s as state } from './watchers-07474b8e.js';
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

const scProductPriceModalCss = ":host{display:block}sc-dialog{--body-spacing:var(--sc-spacing-xx-large);color:var(--sc-color-gray-600);text-decoration:none;font-size:16px}.dialog__header{display:flex;align-items:center;gap:var(--sc-spacing-medium)}.dialog__header-text{line-height:var(--sc-line-height-dense)}.dialog__image img{width:60px;height:60px;display:block}.dialog__action{font-weight:var(--sc-font-weight-bold)}.dialog__product-name{font-size:var(--sc-font-size-small)}";

const ScProductPriceModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.buttonText = undefined;
    this.addToCart = undefined;
  }
  submit() {
    var _a, _b;
    // if add to cart is undefined/false navigate to buy url
    if (!this.addToCart) {
      const checkoutUrl = (_b = (_a = window === null || window === void 0 ? void 0 : window.scData) === null || _a === void 0 ? void 0 : _a.pages) === null || _b === void 0 ? void 0 : _b.checkout;
      if (!checkoutUrl)
        return;
      return window.location.assign(getProductBuyLink(checkoutUrl));
    }
    submitCartForm();
  }
  componentWillLoad() {
    // focus on price input when opened.
    onChange('dialog', () => {
      setTimeout(() => {
        var _a;
        (_a = this.priceInput) === null || _a === void 0 ? void 0 : _a.triggerFocus();
      }, 50);
    });
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (!((_a = state === null || state === void 0 ? void 0 : state.selectedPrice) === null || _a === void 0 ? void 0 : _a.ad_hoc)) {
      return null;
    }
    return (h("sc-dialog", { open: state.dialog === ((this === null || this === void 0 ? void 0 : this.addToCart) ? 'ad_hoc_cart' : 'ad_hoc_buy'), onScRequestClose: () => (state.dialog = null) }, h("span", { class: "dialog__header", slot: "label" }, !!((_b = state === null || state === void 0 ? void 0 : state.product) === null || _b === void 0 ? void 0 : _b.image_url) && (h("div", { class: "dialog__image" }, h("img", { src: (_c = state === null || state === void 0 ? void 0 : state.product) === null || _c === void 0 ? void 0 : _c.image_url }))), h("div", { class: "dialog__header-text" }, h("div", { class: "dialog__action" }, wp.i18n.__('Enter An Amount', 'surecart')), h("div", { class: "dialog__product-name" }, (_d = state === null || state === void 0 ? void 0 : state.product) === null || _d === void 0 ? void 0 : _d.name))), h("sc-form", { onScSubmit: e => {
        e.stopImmediatePropagation();
        this.submit();
      }, onScFormSubmit: e => e.stopImmediatePropagation() }, h("sc-price-input", { ref: el => (this.priceInput = el), value: (_f = (_e = state.adHocAmount) === null || _e === void 0 ? void 0 : _e.toString) === null || _f === void 0 ? void 0 : _f.call(_e), "currency-code": (_g = state === null || state === void 0 ? void 0 : state.selectedPrice) === null || _g === void 0 ? void 0 : _g.currency, min: (_h = state === null || state === void 0 ? void 0 : state.selectedPrice) === null || _h === void 0 ? void 0 : _h.ad_hoc_min_amount, max: (_j = state === null || state === void 0 ? void 0 : state.selectedPrice) === null || _j === void 0 ? void 0 : _j.ad_hoc_max_amount, onScInput: e => (state.adHocAmount = parseInt(e.target.value)), required: true }), h("sc-button", { type: "primary", full: true, submit: true, busy: state.busy }, h("slot", null, this.buttonText || wp.i18n.__('Add To Cart', 'surecart'))))));
  }
  get el() { return getElement(this); }
};
ScProductPriceModal.style = scProductPriceModalCss;

export { ScProductPriceModal as sc_product_price_modal };

//# sourceMappingURL=sc-product-price-modal.entry.js.map
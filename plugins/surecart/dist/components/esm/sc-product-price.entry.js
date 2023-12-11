import { r as registerInstance, h, F as Fragment } from './index-644f5478.js';
import { s as state } from './watchers-07474b8e.js';
import { i as intervalString } from './price-3e976a49.js';
import './index-1046c77e.js';
import './util-60cd51cc.js';
import './utils-f20e895e.js';
import './currency-4692aeb2.js';

const scProductPriceCss = ":host{display:block}.price{display:flex;flex-direction:column;gap:var(--sc-spacing-xxx-small);text-align:var(--sc-product-price-alignment, left);justify-content:var(--sc-product-price-alignment, left)}.price__amounts{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:var(--sc-spacing-xx-small);justify-content:var(--sc-product-price-alignment, left);text-align:var(--sc-product-price-alignment, left)}.price__scratch{text-decoration:line-through;opacity:0.75}.price__interval{font-size:min(var(--sc-font-size-small), 16px);opacity:0.75}.price__details{font-size:min(var(--sc-font-size-small), 16px);opacity:0.75}.price__sale-badge{font-size:min(1em, 14px);align-self:center}";

const ScProductPrice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.prices = undefined;
    this.saleText = undefined;
  }
  renderRange() {
    if (state.prices.length === 1) {
      return this.renderPrice(state.prices[0]);
    }
    return h("sc-price-range", { prices: state.prices });
  }
  renderVariantPrice(selectedVariant) {
    var _a;
    const variant = (_a = state === null || state === void 0 ? void 0 : state.variants) === null || _a === void 0 ? void 0 : _a.find(variant => (variant === null || variant === void 0 ? void 0 : variant.id) === (selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.id));
    return this.renderPrice(state.selectedPrice, variant === null || variant === void 0 ? void 0 : variant.amount);
  }
  renderPrice(price, variantAmount) {
    var _a;
    const amount = (_a = variantAmount !== null && variantAmount !== void 0 ? variantAmount : price === null || price === void 0 ? void 0 : price.amount) !== null && _a !== void 0 ? _a : 0;
    if (price === null || price === void 0 ? void 0 : price.ad_hoc) {
      return wp.i18n.__('Custom Amount', 'surecart');
    }
    return (h(Fragment, null, h("div", { class: "price" }, h("div", { class: "price__amounts" }, !!(price === null || price === void 0 ? void 0 : price.scratch_amount) && (price === null || price === void 0 ? void 0 : price.scratch_amount) !== amount && (h(Fragment, null, (price === null || price === void 0 ? void 0 : price.scratch_amount) === 0 ? (wp.i18n.__('Free', 'surecart')) : (h("sc-format-number", { class: "price__scratch", part: "price__scratch", type: "currency", currency: price.currency, value: price === null || price === void 0 ? void 0 : price.scratch_amount })))), amount === 0 ? wp.i18n.__('Free', 'surecart') : h("sc-format-number", { class: "price__amount", type: "currency", value: amount, currency: price === null || price === void 0 ? void 0 : price.currency }), h("div", { class: "price__interval" }, intervalString(price, {
      showOnce: true,
      abbreviate: false,
      labels: {
        interval: '/',
        period: 
        /** translators: used as in time period: "for 3 months" */
        wp.i18n.__('for', 'surecart'),
      },
    })), !!(price === null || price === void 0 ? void 0 : price.scratch_amount) && (h("sc-tag", { type: "primary", pill: true, class: "price__sale-badge" }, this.saleText || wp.i18n.__('Sale', 'surecart')))), (!!(price === null || price === void 0 ? void 0 : price.trial_duration_days) || (!!(price === null || price === void 0 ? void 0 : price.setup_fee_enabled) && (price === null || price === void 0 ? void 0 : price.setup_fee_amount))) && (h("div", { class: "price__details" }, !!(price === null || price === void 0 ? void 0 : price.trial_duration_days) && (h("span", { class: "price__trial" }, wp.i18n.sprintf(wp.i18n._n('Starting in %s day.', 'Starting in %s days.', price.trial_duration_days, 'surecart'), price.trial_duration_days), " ")), !!(price === null || price === void 0 ? void 0 : price.setup_fee_enabled) && (price === null || price === void 0 ? void 0 : price.setup_fee_amount) && (h("span", { class: "price__setup-fee" }, h("sc-format-number", { type: "currency", value: price.setup_fee_amount, currency: price === null || price === void 0 ? void 0 : price.currency }), ' ', (price === null || price === void 0 ? void 0 : price.setup_fee_name) || wp.i18n.__('Setup Fee', 'surecart'), ".")))))));
  }
  render() {
    if (state === null || state === void 0 ? void 0 : state.selectedVariant) {
      return this.renderVariantPrice(state === null || state === void 0 ? void 0 : state.selectedVariant);
    }
    if (state.selectedPrice) {
      return this.renderPrice(state.selectedPrice);
    }
    if (state.prices.length) {
      return this.renderRange();
    }
    return h("slot", null);
  }
};
ScProductPrice.style = scProductPriceCss;

export { ScProductPrice as sc_product_price };

//# sourceMappingURL=sc-product-price.entry.js.map
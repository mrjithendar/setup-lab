'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-57356c46.js');
const price = require('./price-28f948f3.js');
require('./index-00f0fc21.js');
require('./util-9c366e9f.js');
require('./utils-45815a15.js');
require('./currency-2733c607.js');

const scProductPriceCss = ":host{display:block}.price{display:flex;flex-direction:column;gap:var(--sc-spacing-xxx-small);text-align:var(--sc-product-price-alignment, left);justify-content:var(--sc-product-price-alignment, left)}.price__amounts{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:var(--sc-spacing-xx-small);justify-content:var(--sc-product-price-alignment, left);text-align:var(--sc-product-price-alignment, left)}.price__scratch{text-decoration:line-through;opacity:0.75}.price__interval{font-size:min(var(--sc-font-size-small), 16px);opacity:0.75}.price__details{font-size:min(var(--sc-font-size-small), 16px);opacity:0.75}.price__sale-badge{font-size:min(1em, 14px);align-self:center}";

const ScProductPrice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.prices = undefined;
    this.saleText = undefined;
  }
  renderRange() {
    if (watchers.state.prices.length === 1) {
      return this.renderPrice(watchers.state.prices[0]);
    }
    return index.h("sc-price-range", { prices: watchers.state.prices });
  }
  renderVariantPrice(selectedVariant) {
    var _a;
    const variant = (_a = watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.variants) === null || _a === void 0 ? void 0 : _a.find(variant => (variant === null || variant === void 0 ? void 0 : variant.id) === (selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.id));
    return this.renderPrice(watchers.state.selectedPrice, variant === null || variant === void 0 ? void 0 : variant.amount);
  }
  renderPrice(price$1, variantAmount) {
    var _a;
    const amount = (_a = variantAmount !== null && variantAmount !== void 0 ? variantAmount : price$1 === null || price$1 === void 0 ? void 0 : price$1.amount) !== null && _a !== void 0 ? _a : 0;
    if (price$1 === null || price$1 === void 0 ? void 0 : price$1.ad_hoc) {
      return wp.i18n.__('Custom Amount', 'surecart');
    }
    return (index.h(index.Fragment, null, index.h("div", { class: "price" }, index.h("div", { class: "price__amounts" }, !!(price$1 === null || price$1 === void 0 ? void 0 : price$1.scratch_amount) && (price$1 === null || price$1 === void 0 ? void 0 : price$1.scratch_amount) !== amount && (index.h(index.Fragment, null, (price$1 === null || price$1 === void 0 ? void 0 : price$1.scratch_amount) === 0 ? (wp.i18n.__('Free', 'surecart')) : (index.h("sc-format-number", { class: "price__scratch", part: "price__scratch", type: "currency", currency: price$1.currency, value: price$1 === null || price$1 === void 0 ? void 0 : price$1.scratch_amount })))), amount === 0 ? wp.i18n.__('Free', 'surecart') : index.h("sc-format-number", { class: "price__amount", type: "currency", value: amount, currency: price$1 === null || price$1 === void 0 ? void 0 : price$1.currency }), index.h("div", { class: "price__interval" }, price.intervalString(price$1, {
      showOnce: true,
      abbreviate: false,
      labels: {
        interval: '/',
        period: 
        /** translators: used as in time period: "for 3 months" */
        wp.i18n.__('for', 'surecart'),
      },
    })), !!(price$1 === null || price$1 === void 0 ? void 0 : price$1.scratch_amount) && (index.h("sc-tag", { type: "primary", pill: true, class: "price__sale-badge" }, this.saleText || wp.i18n.__('Sale', 'surecart')))), (!!(price$1 === null || price$1 === void 0 ? void 0 : price$1.trial_duration_days) || (!!(price$1 === null || price$1 === void 0 ? void 0 : price$1.setup_fee_enabled) && (price$1 === null || price$1 === void 0 ? void 0 : price$1.setup_fee_amount))) && (index.h("div", { class: "price__details" }, !!(price$1 === null || price$1 === void 0 ? void 0 : price$1.trial_duration_days) && (index.h("span", { class: "price__trial" }, wp.i18n.sprintf(wp.i18n._n('Starting in %s day.', 'Starting in %s days.', price$1.trial_duration_days, 'surecart'), price$1.trial_duration_days), " ")), !!(price$1 === null || price$1 === void 0 ? void 0 : price$1.setup_fee_enabled) && (price$1 === null || price$1 === void 0 ? void 0 : price$1.setup_fee_amount) && (index.h("span", { class: "price__setup-fee" }, index.h("sc-format-number", { type: "currency", value: price$1.setup_fee_amount, currency: price$1 === null || price$1 === void 0 ? void 0 : price$1.currency }), ' ', (price$1 === null || price$1 === void 0 ? void 0 : price$1.setup_fee_name) || wp.i18n.__('Setup Fee', 'surecart'), ".")))))));
  }
  render() {
    if (watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.selectedVariant) {
      return this.renderVariantPrice(watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.selectedVariant);
    }
    if (watchers.state.selectedPrice) {
      return this.renderPrice(watchers.state.selectedPrice);
    }
    if (watchers.state.prices.length) {
      return this.renderRange();
    }
    return index.h("slot", null);
  }
};
ScProductPrice.style = scProductPriceCss;

exports.sc_product_price = ScProductPrice;

//# sourceMappingURL=sc-product-price.cjs.entry.js.map
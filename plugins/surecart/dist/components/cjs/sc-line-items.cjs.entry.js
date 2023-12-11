'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const google = require('./google-13aecc85.js');
const index$1 = require('./index-49cf7c76.js');
const price = require('./price-28f948f3.js');
const mutations = require('./mutations-29dac4a7.js');
const getters = require('./getters-5c083014.js');
require('./currency-2733c607.js');
require('./add-query-args-17c551b6.js');
require('./index-00f0fc21.js');
require('./get-query-arg-53bf21e2.js');
require('./utils-45815a15.js');
require('./mutations-957d9aea.js');
require('./store-68346eb0.js');
require('./mutations-2fd46f36.js');
require('./index-e302f7c9.js');
require('./watchers-eeca9c2e.js');
require('./watchers-d7bdd741.js');
require('./getters-a4757e13.js');
require('./util-9c366e9f.js');
require('./fetch-2dba325c.js');

const scLineItemsCss = ":host{display:block}:slotted(*~*){margin-top:20px}.line-items{display:grid;gap:var(--sc-form-row-spacing)}.line-item{display:grid;gap:var(--sc-spacing-small)}.fee__description{opacity:0.75}";

const ScLineItems = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.editable = undefined;
    this.removable = undefined;
  }
  /**
   * Is the line item editable?
   */
  isEditable(item) {
    var _a;
    // ad_hoc prices and bumps cannot have quantity.
    if (((_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.ad_hoc) || (item === null || item === void 0 ? void 0 : item.bump_amount)) {
      return false;
    }
    return this.editable;
  }
  render() {
    var _a, _b, _c, _d, _e;
    if (!!getters.formBusy() && !((_c = (_b = (_a = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length)) {
      return (index.h("sc-line-item", null, index.h("sc-skeleton", { style: { 'width': '50px', 'height': '50px', '--border-radius': '0' }, slot: "image" }), index.h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), index.h("sc-skeleton", { slot: "description", style: { width: '60px', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '120px', display: 'inline-block' }, slot: "price" }), index.h("sc-skeleton", { style: { width: '60px', display: 'inline-block' }, slot: "price-description" })));
    }
    return (index.h("div", { class: "line-items", part: "base" }, (((_e = (_d = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) || []).map(item => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
      return (index.h("div", { class: "line-item" }, index.h("sc-product-line-item", { key: item.id, imageUrl: ((_a = item === null || item === void 0 ? void 0 : item.variant) === null || _a === void 0 ? void 0 : _a.image_url) || ((_c = (_b = item === null || item === void 0 ? void 0 : item.price) === null || _b === void 0 ? void 0 : _b.product) === null || _c === void 0 ? void 0 : _c.image_url), name: (_e = (_d = item === null || item === void 0 ? void 0 : item.price) === null || _d === void 0 ? void 0 : _d.product) === null || _e === void 0 ? void 0 : _e.name, priceName: (_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.name, variantLabel: ((item === null || item === void 0 ? void 0 : item.variant_options) || []).filter(Boolean).join(' / ') || null, max: (_h = (_g = item === null || item === void 0 ? void 0 : item.price) === null || _g === void 0 ? void 0 : _g.product) === null || _h === void 0 ? void 0 : _h.purchase_limit, editable: this.isEditable(item), removable: this.removable, quantity: item.quantity, fees: (_j = item === null || item === void 0 ? void 0 : item.fees) === null || _j === void 0 ? void 0 : _j.data, setupFeeTrialEnabled: (_k = item === null || item === void 0 ? void 0 : item.price) === null || _k === void 0 ? void 0 : _k.setup_fee_trial_enabled, amount: item.ad_hoc_amount !== null ? item.ad_hoc_amount : item.subtotal_amount, scratchAmount: item.ad_hoc_amount == null && (item === null || item === void 0 ? void 0 : item.scratch_amount), currency: (_l = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _l === void 0 ? void 0 : _l.currency, trialDurationDays: (_m = item === null || item === void 0 ? void 0 : item.price) === null || _m === void 0 ? void 0 : _m.trial_duration_days, interval: !!(item === null || item === void 0 ? void 0 : item.price) && price.intervalString(item === null || item === void 0 ? void 0 : item.price, { showOnce: index$1.hasSubscription(google.state === null || google.state === void 0 ? void 0 : google.state.checkout) }), onScUpdateQuantity: e => mutations.updateCheckoutLineItem({ id: item.id, data: { quantity: e.detail } }), onScRemove: () => mutations.removeCheckoutLineItem(item === null || item === void 0 ? void 0 : item.id), exportparts: "base:line-item, product-line-item, image:line-item__image, text:line-item__text, title:line-item__title, suffix:line-item__suffix, price:line-item__price, price__amount:line-item__price-amount, price__description:line-item__price-description, price__scratch:line-item__price-scratch, static-quantity:line-item__static-quantity, remove-icon__base:line-item__remove-icon, quantity:line-item__quantity, quantity__minus:line-item__quantity-minus, quantity__minus-icon:line-item__quantity-minus-icon, quantity__plus:line-item__quantity-plus, quantity__plus-icon:line-item__quantity-plus-icon, quantity__input:line-item__quantity-input, line-item__price-description:line-item__price-description" })));
    })));
  }
};
ScLineItems.style = scLineItemsCss;

exports.sc_line_items = ScLineItems;

//# sourceMappingURL=sc-line-items.cjs.entry.js.map
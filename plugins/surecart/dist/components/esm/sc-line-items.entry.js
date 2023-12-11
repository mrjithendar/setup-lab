import { r as registerInstance, h } from './index-644f5478.js';
import { s as state } from './google-db792dd1.js';
import { h as hasSubscription } from './index-74024349.js';
import { i as intervalString } from './price-3e976a49.js';
import { a as updateCheckoutLineItem, r as removeCheckoutLineItem } from './mutations-aff3c7ce.js';
import { f as formBusy } from './getters-26bb263b.js';
import './currency-4692aeb2.js';
import './add-query-args-f4c5962b.js';
import './index-1046c77e.js';
import './get-query-arg-cb6b8763.js';
import './utils-f20e895e.js';
import './mutations-34f0f38c.js';
import './store-b85bbb50.js';
import './mutations-abf45d08.js';
import './index-d873f782.js';
import './watchers-cfaf7553.js';
import './watchers-f761bdb6.js';
import './getters-d70b464d.js';
import './util-60cd51cc.js';
import './fetch-2525e763.js';

const scLineItemsCss = ":host{display:block}:slotted(*~*){margin-top:20px}.line-items{display:grid;gap:var(--sc-form-row-spacing)}.line-item{display:grid;gap:var(--sc-spacing-small)}.fee__description{opacity:0.75}";

const ScLineItems = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    if (!!formBusy() && !((_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length)) {
      return (h("sc-line-item", null, h("sc-skeleton", { style: { 'width': '50px', 'height': '50px', '--border-radius': '0' }, slot: "image" }), h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), h("sc-skeleton", { slot: "description", style: { width: '60px', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '120px', display: 'inline-block' }, slot: "price" }), h("sc-skeleton", { style: { width: '60px', display: 'inline-block' }, slot: "price-description" })));
    }
    return (h("div", { class: "line-items", part: "base" }, (((_e = (_d = state === null || state === void 0 ? void 0 : state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) || []).map(item => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
      return (h("div", { class: "line-item" }, h("sc-product-line-item", { key: item.id, imageUrl: ((_a = item === null || item === void 0 ? void 0 : item.variant) === null || _a === void 0 ? void 0 : _a.image_url) || ((_c = (_b = item === null || item === void 0 ? void 0 : item.price) === null || _b === void 0 ? void 0 : _b.product) === null || _c === void 0 ? void 0 : _c.image_url), name: (_e = (_d = item === null || item === void 0 ? void 0 : item.price) === null || _d === void 0 ? void 0 : _d.product) === null || _e === void 0 ? void 0 : _e.name, priceName: (_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.name, variantLabel: ((item === null || item === void 0 ? void 0 : item.variant_options) || []).filter(Boolean).join(' / ') || null, max: (_h = (_g = item === null || item === void 0 ? void 0 : item.price) === null || _g === void 0 ? void 0 : _g.product) === null || _h === void 0 ? void 0 : _h.purchase_limit, editable: this.isEditable(item), removable: this.removable, quantity: item.quantity, fees: (_j = item === null || item === void 0 ? void 0 : item.fees) === null || _j === void 0 ? void 0 : _j.data, setupFeeTrialEnabled: (_k = item === null || item === void 0 ? void 0 : item.price) === null || _k === void 0 ? void 0 : _k.setup_fee_trial_enabled, amount: item.ad_hoc_amount !== null ? item.ad_hoc_amount : item.subtotal_amount, scratchAmount: item.ad_hoc_amount == null && (item === null || item === void 0 ? void 0 : item.scratch_amount), currency: (_l = state === null || state === void 0 ? void 0 : state.checkout) === null || _l === void 0 ? void 0 : _l.currency, trialDurationDays: (_m = item === null || item === void 0 ? void 0 : item.price) === null || _m === void 0 ? void 0 : _m.trial_duration_days, interval: !!(item === null || item === void 0 ? void 0 : item.price) && intervalString(item === null || item === void 0 ? void 0 : item.price, { showOnce: hasSubscription(state === null || state === void 0 ? void 0 : state.checkout) }), onScUpdateQuantity: e => updateCheckoutLineItem({ id: item.id, data: { quantity: e.detail } }), onScRemove: () => removeCheckoutLineItem(item === null || item === void 0 ? void 0 : item.id), exportparts: "base:line-item, product-line-item, image:line-item__image, text:line-item__text, title:line-item__title, suffix:line-item__suffix, price:line-item__price, price__amount:line-item__price-amount, price__description:line-item__price-description, price__scratch:line-item__price-scratch, static-quantity:line-item__static-quantity, remove-icon__base:line-item__remove-icon, quantity:line-item__quantity, quantity__minus:line-item__quantity-minus, quantity__minus-icon:line-item__quantity-minus-icon, quantity__plus:line-item__quantity-plus, quantity__plus-icon:line-item__quantity-plus-icon, quantity__input:line-item__quantity-input, line-item__price-description:line-item__price-description" })));
    })));
  }
};
ScLineItems.style = scLineItemsCss;

export { ScLineItems as sc_line_items };

//# sourceMappingURL=sc-line-items.entry.js.map
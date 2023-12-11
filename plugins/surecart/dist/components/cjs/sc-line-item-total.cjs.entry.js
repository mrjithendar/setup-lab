'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const google = require('./google-13aecc85.js');
const getters = require('./getters-5c083014.js');
require('./currency-2733c607.js');
require('./add-query-args-17c551b6.js');
require('./index-00f0fc21.js');
require('./get-query-arg-53bf21e2.js');
require('./utils-45815a15.js');
require('./store-68346eb0.js');

const scLineItemTotalCss = ":host{display:block}sc-line-item{text-align:left}.line-item-total__group sc-line-item{margin:4px 0px !important}.scratch-price{text-decoration:line-through;color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small);margin-right:var(--sc-spacing-xx-small)}sc-line-item::part(base){grid-template-columns:max-content auto auto}.total-price{white-space:nowrap}";

const ScLineItemTotal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.order_key = {
      total: 'total_amount',
      subtotal: 'subtotal_amount',
      amount_due: 'amount_due',
    };
    this.total = 'total';
    this.size = undefined;
    this.checkout = undefined;
  }
  render() {
    var _a;
    const checkout = this.checkout || (google.state === null || google.state === void 0 ? void 0 : google.state.checkout);
    // loading state
    if (getters.formBusy() && !(checkout === null || checkout === void 0 ? void 0 : checkout[(_a = this === null || this === void 0 ? void 0 : this.order_key) === null || _a === void 0 ? void 0 : _a[this === null || this === void 0 ? void 0 : this.total]])) {
      return (index.h("sc-line-item", null, index.h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), index.h("sc-skeleton", { slot: "price", style: { 'width': '70px', 'display': 'inline-block', 'height': this.size === 'large' ? '40px' : '', '--border-radius': '6px' } })));
    }
    if (!(checkout === null || checkout === void 0 ? void 0 : checkout.currency))
      return;
    // if the total amount is different than the amount due.
    if (this.total === 'total' && (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) !== (checkout === null || checkout === void 0 ? void 0 : checkout.amount_due)) {
      return (index.h("div", { class: "line-item-total__group" }, index.h("sc-line-item", null, index.h("span", { slot: "description" }, index.h("slot", { name: "title" }), index.h("slot", { name: "description" })), index.h("span", { slot: "price" }, index.h("sc-total", { order: checkout, total: this.total }))), index.h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { slot: "title" }, index.h("slot", { name: "subscription-title" }, wp.i18n.__('Total Due Today', 'surecart'))), index.h("span", { slot: "price" }, index.h("sc-format-number", { type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.amount_due })))));
    }
    return (index.h("sc-line-item", { style: this.size === 'large' ? { '--price-size': 'var(--sc-font-size-x-large)' } : {} }, index.h("span", { slot: "title" }, index.h("slot", { name: "title" })), index.h("span", { slot: "description" }, index.h("slot", { name: "description" })), index.h("span", { slot: "price" }, !!(checkout === null || checkout === void 0 ? void 0 : checkout.total_savings_amount) && this.total === 'total' && (index.h("sc-format-number", { class: "scratch-price", type: "currency", value: -(checkout === null || checkout === void 0 ? void 0 : checkout.total_savings_amount) + (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount), currency: (checkout === null || checkout === void 0 ? void 0 : checkout.currency) || 'usd' })), index.h("sc-total", { class: "total-price", order: checkout, total: this.total }))));
  }
};
ScLineItemTotal.style = scLineItemTotalCss;

exports.sc_line_item_total = ScLineItemTotal;

//# sourceMappingURL=sc-line-item-total.cjs.entry.js.map
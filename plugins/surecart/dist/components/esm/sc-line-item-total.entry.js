import { r as registerInstance, h } from './index-644f5478.js';
import { s as state } from './google-db792dd1.js';
import { f as formBusy } from './getters-26bb263b.js';
import './currency-4692aeb2.js';
import './add-query-args-f4c5962b.js';
import './index-1046c77e.js';
import './get-query-arg-cb6b8763.js';
import './utils-f20e895e.js';
import './store-b85bbb50.js';

const scLineItemTotalCss = ":host{display:block}sc-line-item{text-align:left}.line-item-total__group sc-line-item{margin:4px 0px !important}.scratch-price{text-decoration:line-through;color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small);margin-right:var(--sc-spacing-xx-small)}sc-line-item::part(base){grid-template-columns:max-content auto auto}.total-price{white-space:nowrap}";

const ScLineItemTotal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    const checkout = this.checkout || (state === null || state === void 0 ? void 0 : state.checkout);
    // loading state
    if (formBusy() && !(checkout === null || checkout === void 0 ? void 0 : checkout[(_a = this === null || this === void 0 ? void 0 : this.order_key) === null || _a === void 0 ? void 0 : _a[this === null || this === void 0 ? void 0 : this.total]])) {
      return (h("sc-line-item", null, h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), h("sc-skeleton", { slot: "price", style: { 'width': '70px', 'display': 'inline-block', 'height': this.size === 'large' ? '40px' : '', '--border-radius': '6px' } })));
    }
    if (!(checkout === null || checkout === void 0 ? void 0 : checkout.currency))
      return;
    // if the total amount is different than the amount due.
    if (this.total === 'total' && (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) !== (checkout === null || checkout === void 0 ? void 0 : checkout.amount_due)) {
      return (h("div", { class: "line-item-total__group" }, h("sc-line-item", null, h("span", { slot: "description" }, h("slot", { name: "title" }), h("slot", { name: "description" })), h("span", { slot: "price" }, h("sc-total", { order: checkout, total: this.total }))), h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, h("span", { slot: "title" }, h("slot", { name: "subscription-title" }, wp.i18n.__('Total Due Today', 'surecart'))), h("span", { slot: "price" }, h("sc-format-number", { type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.amount_due })))));
    }
    return (h("sc-line-item", { style: this.size === 'large' ? { '--price-size': 'var(--sc-font-size-x-large)' } : {} }, h("span", { slot: "title" }, h("slot", { name: "title" })), h("span", { slot: "description" }, h("slot", { name: "description" })), h("span", { slot: "price" }, !!(checkout === null || checkout === void 0 ? void 0 : checkout.total_savings_amount) && this.total === 'total' && (h("sc-format-number", { class: "scratch-price", type: "currency", value: -(checkout === null || checkout === void 0 ? void 0 : checkout.total_savings_amount) + (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount), currency: (checkout === null || checkout === void 0 ? void 0 : checkout.currency) || 'usd' })), h("sc-total", { class: "total-price", order: checkout, total: this.total }))));
  }
};
ScLineItemTotal.style = scLineItemTotalCss;

export { ScLineItemTotal as sc_line_item_total };

//# sourceMappingURL=sc-line-item-total.entry.js.map
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-57356c46.js');
require('./index-00f0fc21.js');
require('./util-9c366e9f.js');
require('./utils-45815a15.js');

const scProductQuantityCss = ":host{display:block}";

let id = 0;
const ScProductQuantity = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.inputId = `sc-quantity-${++id}`;
    this.helpId = `sc-quantity-help-text-${id}`;
    this.labelId = `sc-quantity-label-${id}`;
    this.size = 'medium';
    this.name = undefined;
    this.errors = undefined;
    this.showLabel = true;
    this.label = undefined;
    this.required = false;
    this.help = undefined;
  }
  getMaxStockQty() {
    var _a, _b, _c;
    // check purchase limit.
    if ((_a = watchers.state.product) === null || _a === void 0 ? void 0 : _a.purchase_limit) {
      return watchers.state.product.purchase_limit;
    }
    // If stock is not enabled, return null.
    if (!watchers.isStockNeedsToBeChecked) {
      return null;
    }
    // If no variant is selected, check against product stock.
    if (!(watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.selectedVariant))
      return (_b = watchers.state.product) === null || _b === void 0 ? void 0 : _b.available_stock;
    // Check against selected variant's stock.
    return (_c = watchers.state.selectedVariant) === null || _c === void 0 ? void 0 : _c.available_stock;
  }
  render() {
    var _a, _b;
    return (index.h(index.Host, null, index.h("sc-form-control", { exportparts: "label, help-text, form-control", size: this.size, required: this.required, label: this.label, showLabel: this.showLabel, help: this.help, inputId: this.inputId, helpId: this.helpId, labelId: this.labelId, name: this.name }, index.h("sc-quantity-select", { size: this.size, quantity: Math.max(((_a = watchers.state.selectedPrice) === null || _a === void 0 ? void 0 : _a.ad_hoc) ? 1 : watchers.state.quantity, 1), disabled: (_b = watchers.state.selectedPrice) === null || _b === void 0 ? void 0 : _b.ad_hoc, onScInput: e => (watchers.state.quantity = e.detail), ...(!!this.getMaxStockQty() ? { max: this.getMaxStockQty() } : {}) }))));
  }
};
ScProductQuantity.style = scProductQuantityCss;

exports.sc_product_quantity = ScProductQuantity;

//# sourceMappingURL=sc-product-quantity.cjs.entry.js.map
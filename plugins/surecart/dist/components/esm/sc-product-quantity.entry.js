import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import { s as state, j as isStockNeedsToBeChecked } from './watchers-07474b8e.js';
import './index-1046c77e.js';
import './util-60cd51cc.js';
import './utils-f20e895e.js';

const scProductQuantityCss = ":host{display:block}";

let id = 0;
const ScProductQuantity = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    if ((_a = state.product) === null || _a === void 0 ? void 0 : _a.purchase_limit) {
      return state.product.purchase_limit;
    }
    // If stock is not enabled, return null.
    if (!isStockNeedsToBeChecked) {
      return null;
    }
    // If no variant is selected, check against product stock.
    if (!(state === null || state === void 0 ? void 0 : state.selectedVariant))
      return (_b = state.product) === null || _b === void 0 ? void 0 : _b.available_stock;
    // Check against selected variant's stock.
    return (_c = state.selectedVariant) === null || _c === void 0 ? void 0 : _c.available_stock;
  }
  render() {
    var _a, _b;
    return (h(Host, null, h("sc-form-control", { exportparts: "label, help-text, form-control", size: this.size, required: this.required, label: this.label, showLabel: this.showLabel, help: this.help, inputId: this.inputId, helpId: this.helpId, labelId: this.labelId, name: this.name }, h("sc-quantity-select", { size: this.size, quantity: Math.max(((_a = state.selectedPrice) === null || _a === void 0 ? void 0 : _a.ad_hoc) ? 1 : state.quantity, 1), disabled: (_b = state.selectedPrice) === null || _b === void 0 ? void 0 : _b.ad_hoc, onScInput: e => (state.quantity = e.detail), ...(!!this.getMaxStockQty() ? { max: this.getMaxStockQty() } : {}) }))));
  }
};
ScProductQuantity.style = scProductQuantityCss;

export { ScProductQuantity as sc_product_quantity };

//# sourceMappingURL=sc-product-quantity.entry.js.map
import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import { o as openWormhole } from './consumer-32cc6385.js';

const scLineItemBumpCss = ":host{display:block}";

const ScLineItemBump = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.order = undefined;
    this.label = undefined;
    this.loading = undefined;
  }
  render() {
    var _a, _b, _c;
    if (!((_a = this === null || this === void 0 ? void 0 : this.order) === null || _a === void 0 ? void 0 : _a.bump_amount)) {
      return h(Host, { style: { display: 'none' } });
    }
    return (h("sc-line-item", null, h("span", { slot: "description" }, this.label || wp.i18n.__('Bundle Discount', 'surecart')), h("span", { slot: "price" }, h("sc-format-number", { type: "currency", currency: ((_b = this.order) === null || _b === void 0 ? void 0 : _b.currency) || 'usd', value: (_c = this.order) === null || _c === void 0 ? void 0 : _c.bump_amount }))));
  }
};
openWormhole(ScLineItemBump, ['order'], false);
ScLineItemBump.style = scLineItemBumpCss;

export { ScLineItemBump as sc_line_item_bump };

//# sourceMappingURL=sc-line-item-bump.entry.js.map
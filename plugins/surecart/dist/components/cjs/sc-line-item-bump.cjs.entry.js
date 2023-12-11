'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const consumer = require('./consumer-21fdeb72.js');

const scLineItemBumpCss = ":host{display:block}";

const ScLineItemBump = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.order = undefined;
    this.label = undefined;
    this.loading = undefined;
  }
  render() {
    var _a, _b, _c;
    if (!((_a = this === null || this === void 0 ? void 0 : this.order) === null || _a === void 0 ? void 0 : _a.bump_amount)) {
      return index.h(index.Host, { style: { display: 'none' } });
    }
    return (index.h("sc-line-item", null, index.h("span", { slot: "description" }, this.label || wp.i18n.__('Bundle Discount', 'surecart')), index.h("span", { slot: "price" }, index.h("sc-format-number", { type: "currency", currency: ((_b = this.order) === null || _b === void 0 ? void 0 : _b.currency) || 'usd', value: (_c = this.order) === null || _c === void 0 ? void 0 : _c.bump_amount }))));
  }
};
consumer.openWormhole(ScLineItemBump, ['order'], false);
ScLineItemBump.style = scLineItemBumpCss;

exports.sc_line_item_bump = ScLineItemBump;

//# sourceMappingURL=sc-line-item-bump.cjs.entry.js.map
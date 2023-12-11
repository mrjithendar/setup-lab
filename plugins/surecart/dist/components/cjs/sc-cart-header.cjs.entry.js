'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const google = require('./google-13aecc85.js');
require('./currency-2733c607.js');
require('./add-query-args-17c551b6.js');
require('./index-00f0fc21.js');
require('./get-query-arg-53bf21e2.js');
require('./utils-45815a15.js');

const scCartHeaderCss = ".cart-header{display:flex;align-items:center;justify-content:space-between;width:100%;font-size:1em}.cart-title{text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 var(--sc-spacing-small)}.cart__close{cursor:pointer}";

const ScCartHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scCloseCart = index.createEvent(this, "scCloseCart", 7);
  }
  /** Count the number of items in the cart. */
  getItemsCount() {
    var _a, _b;
    const items = ((_b = (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) || [];
    let count = 0;
    items.forEach(item => {
      count = count + (item === null || item === void 0 ? void 0 : item.quantity);
    });
    return count;
  }
  render() {
    var _a;
    return (index.h("div", { class: "cart-header" }, index.h("sc-icon", { class: "cart__close", name: "arrow-right", onClick: () => this.scCloseCart.emit() }), index.h("div", { class: "cart-title" }, index.h("slot", null)), index.h("sc-tag", { size: "small" }, ((_a = this === null || this === void 0 ? void 0 : this.getItemsCount) === null || _a === void 0 ? void 0 : _a.call(this)) || 0)));
  }
};
ScCartHeader.style = scCartHeaderCss;

exports.sc_cart_header = ScCartHeader;

//# sourceMappingURL=sc-cart-header.cjs.entry.js.map
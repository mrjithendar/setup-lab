'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-57356c46.js');
require('./index-00f0fc21.js');
require('./util-9c366e9f.js');
require('./utils-45815a15.js');

const scProductTextCss = ":host{display:block}p{margin-block-start:0;margin-block-end:1em}";

const ScProductText = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.text = 'name';
  }
  render() {
    var _a;
    if ((_a = watchers.state.product) === null || _a === void 0 ? void 0 : _a[this.text]) {
      return index.h("span", { style: { whiteSpace: 'pre-line' }, innerHTML: watchers.state.product[this.text] });
    }
    return (index.h(index.Host, null, index.h("slot", null)));
  }
};
ScProductText.style = scProductTextCss;

exports.sc_product_text = ScProductText;

//# sourceMappingURL=sc-product-text.cjs.entry.js.map
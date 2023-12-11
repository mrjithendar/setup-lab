import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import { s as state } from './watchers-07474b8e.js';
import './index-1046c77e.js';
import './util-60cd51cc.js';
import './utils-f20e895e.js';

const scProductTextCss = ":host{display:block}p{margin-block-start:0;margin-block-end:1em}";

const ScProductText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.text = 'name';
  }
  render() {
    var _a;
    if ((_a = state.product) === null || _a === void 0 ? void 0 : _a[this.text]) {
      return h("span", { style: { whiteSpace: 'pre-line' }, innerHTML: state.product[this.text] });
    }
    return (h(Host, null, h("slot", null)));
  }
};
ScProductText.style = scProductTextCss;

export { ScProductText as sc_product_text };

//# sourceMappingURL=sc-product-text.entry.js.map
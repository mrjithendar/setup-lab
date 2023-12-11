import { r as registerInstance, h } from './index-644f5478.js';
import { s as state } from './google-db792dd1.js';
import { s as store } from './ui-20706656.js';
import './currency-4692aeb2.js';
import './add-query-args-f4c5962b.js';
import './index-1046c77e.js';
import './get-query-arg-cb6b8763.js';
import './utils-f20e895e.js';

const scCartLoaderCss = ":host{position:absolute;z-index:var(--sc-cart-z-index, 999999);font-family:var(--sc-font-sans)}";

const ScCartLoader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.template = undefined;
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    // check for forms.
    if (document.querySelector('sc-checkout')) {
      return;
    }
    // clear the order if it's already paid.
    if (((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.status) === 'paid') {
      state.checkout = null;
      return null;
    }
    // return the loader.
    return h("div", { innerHTML: ((_d = (_c = (_b = state === null || state === void 0 ? void 0 : state.checkout) === null || _b === void 0 ? void 0 : _b.line_items) === null || _c === void 0 ? void 0 : _c.pagination) === null || _d === void 0 ? void 0 : _d.count) || ((_f = (_e = store === null || store === void 0 ? void 0 : store.state) === null || _e === void 0 ? void 0 : _e.cart) === null || _f === void 0 ? void 0 : _f.open) ? this.template : '' });
  }
};
ScCartLoader.style = scCartLoaderCss;

export { ScCartLoader as sc_cart_loader };

//# sourceMappingURL=sc-cart-loader.entry.js.map
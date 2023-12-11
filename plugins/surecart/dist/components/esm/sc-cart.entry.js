import { r as registerInstance, h, F as Fragment } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { b as baseUrl, e as expand } from './index-d873f782.js';
import { g as getCheckout, a as setCheckout, s as state } from './google-db792dd1.js';
import { s as store } from './ui-20706656.js';
import { c as createErrorNotice } from './mutations-abf45d08.js';
import { u as updateFormState } from './mutations-34f0f38c.js';
import { f as formBusy } from './getters-26bb263b.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';
import './watchers-cfaf7553.js';
import './watchers-f761bdb6.js';
import './index-1046c77e.js';
import './getters-d70b464d.js';
import './util-60cd51cc.js';
import './utils-f20e895e.js';
import './get-query-arg-cb6b8763.js';
import './currency-4692aeb2.js';
import './store-b85bbb50.js';

const scCartCss = ":host{--sc-drawer-header-spacing:var(--sc-spacing-large);--sc-drawer-body-spacing:var(--sc-spacing-large);--sc-drawer-footer-spacing:var(--sc-spacing-large)}.cart{font-size:16px}.cart__header{display:flex;align-items:center;justify-content:space-between;width:100%;font-size:1em}.cart__close{opacity:0.75;transition:opacity 0.25s ease;cursor:pointer}.cart__close:hover{opacity:1}::slotted(*){padding:var(--sc-drawer-header-spacing);background:var(--sc-panel-background-color);position:relative}::slotted(sc-line-items){flex:1 1 auto;overflow:auto;-webkit-overflow-scrolling:touch;min-height:200px}::slotted(:last-child){border-bottom:0 !important}sc-drawer::part(body){display:flex;flex-direction:column;box-sizing:border-box;padding:0;overflow:hidden}";

const ScCart = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.open = null;
    this.formId = undefined;
    this.header = undefined;
    this.checkoutLink = undefined;
    this.cartTemplate = undefined;
    this.mode = 'live';
    this.checkoutUrl = undefined;
    this.alwaysShow = undefined;
    this.floatingIconEnabled = true;
    this.uiState = 'idle';
  }
  handleOpenChange() {
    store.set('cart', { ...store.state.cart, ...{ open: this.open } });
    if (this.open === true) {
      this.fetchOrder();
      setTimeout(() => {
        this.drawer.focus();
      }, 500);
    }
  }
  order() {
    return getCheckout(this.formId, this.mode);
  }
  setCheckout(data) {
    setCheckout(data, this.formId);
  }
  /**
   * Search for the sc-checkout component on a page to make sure
   * we don't show the cart on a checkout page.
   */
  pageHasForm() {
    return !!document.querySelector('sc-checkout');
  }
  /** Count the number of items in the cart. */
  getItemsCount() {
    var _a, _b;
    const items = (_b = (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data;
    let count = 0;
    (items || []).forEach(item => {
      count = count + (item === null || item === void 0 ? void 0 : item.quantity);
    });
    return count;
  }
  handleSetState(e) {
    this.uiState = e.detail;
  }
  handleCloseCart() {
    this.open = false;
  }
  /** Fetch the order */
  async fetchOrder() {
    var _a;
    try {
      updateFormState('FETCH');
      state.checkout = (await apiFetch({
        method: 'GET',
        path: addQueryArgs(`${baseUrl}${(_a = state.checkout) === null || _a === void 0 ? void 0 : _a.id}`, {
          expand,
        }),
      }));
      updateFormState('RESOLVE');
    }
    catch (e) {
      console.error(e);
      updateFormState('REJECT');
      createErrorNotice(e);
    }
  }
  componentWillLoad() {
    this.open = !!store.state.cart.open;
    store.onChange('cart', cart => {
      this.open = cart.open;
    });
  }
  state() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return {
      uiState: this.uiState,
      checkoutLink: this.checkoutLink,
      loading: this.uiState === 'loading',
      busy: this.uiState === 'busy',
      navigating: this.uiState === 'navigating',
      empty: !((_c = (_b = (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.pagination) === null || _c === void 0 ? void 0 : _c.count),
      order: state.checkout,
      lineItems: ((_e = (_d = state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) || [],
      tax_status: (_f = state.checkout) === null || _f === void 0 ? void 0 : _f.tax_status,
      customerShippingAddress: typeof ((_g = state.checkout) === null || _g === void 0 ? void 0 : _g.customer) !== 'string' ? (_j = (_h = state.checkout) === null || _h === void 0 ? void 0 : _h.customer) === null || _j === void 0 ? void 0 : _j.shipping_address : {},
      shippingAddress: (_k = state.checkout) === null || _k === void 0 ? void 0 : _k.shipping_address,
      taxStatus: (_l = state.checkout) === null || _l === void 0 ? void 0 : _l.tax_status,
      formId: this.formId,
    };
  }
  render() {
    return (h("sc-cart-session-provider", null, h("sc-drawer", { ref: el => (this.drawer = el), open: this.open, onScAfterHide: () => (this.open = false), onScAfterShow: () => (this.open = true) }, this.open === true && (h(Fragment, null, h("div", { class: "cart__header-suffix", slot: "header" }, h("slot", { name: "cart-header" }), h("sc-error", { style: { '--sc-alert-border-radius': '0' }, slot: "header" })), h("slot", null))), formBusy() && h("sc-block-ui", { "z-index": 9 }))));
  }
  static get watchers() { return {
    "open": ["handleOpenChange"]
  }; }
};
ScCart.style = scCartCss;

export { ScCart as sc_cart };

//# sourceMappingURL=sc-cart.entry.js.map
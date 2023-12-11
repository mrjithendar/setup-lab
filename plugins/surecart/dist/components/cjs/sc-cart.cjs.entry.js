'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const fetch = require('./fetch-2dba325c.js');
const index$1 = require('./index-e302f7c9.js');
const google = require('./google-13aecc85.js');
const ui = require('./ui-aaeb2895.js');
const mutations$1 = require('./mutations-2fd46f36.js');
const mutations = require('./mutations-957d9aea.js');
const getters = require('./getters-5c083014.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
require('./watchers-eeca9c2e.js');
require('./watchers-d7bdd741.js');
require('./index-00f0fc21.js');
require('./getters-a4757e13.js');
require('./util-9c366e9f.js');
require('./utils-45815a15.js');
require('./get-query-arg-53bf21e2.js');
require('./currency-2733c607.js');
require('./store-68346eb0.js');

const scCartCss = ":host{--sc-drawer-header-spacing:var(--sc-spacing-large);--sc-drawer-body-spacing:var(--sc-spacing-large);--sc-drawer-footer-spacing:var(--sc-spacing-large)}.cart{font-size:16px}.cart__header{display:flex;align-items:center;justify-content:space-between;width:100%;font-size:1em}.cart__close{opacity:0.75;transition:opacity 0.25s ease;cursor:pointer}.cart__close:hover{opacity:1}::slotted(*){padding:var(--sc-drawer-header-spacing);background:var(--sc-panel-background-color);position:relative}::slotted(sc-line-items){flex:1 1 auto;overflow:auto;-webkit-overflow-scrolling:touch;min-height:200px}::slotted(:last-child){border-bottom:0 !important}sc-drawer::part(body){display:flex;flex-direction:column;box-sizing:border-box;padding:0;overflow:hidden}";

const ScCart = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    ui.store.set('cart', { ...ui.store.state.cart, ...{ open: this.open } });
    if (this.open === true) {
      this.fetchOrder();
      setTimeout(() => {
        this.drawer.focus();
      }, 500);
    }
  }
  order() {
    return google.getCheckout(this.formId, this.mode);
  }
  setCheckout(data) {
    google.setCheckout(data, this.formId);
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
    const items = (_b = (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data;
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
      mutations.updateFormState('FETCH');
      google.state.checkout = (await fetch.apiFetch({
        method: 'GET',
        path: addQueryArgs.addQueryArgs(`${index$1.baseUrl}${(_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.id}`, {
          expand: index$1.expand,
        }),
      }));
      mutations.updateFormState('RESOLVE');
    }
    catch (e) {
      console.error(e);
      mutations.updateFormState('REJECT');
      mutations$1.createErrorNotice(e);
    }
  }
  componentWillLoad() {
    this.open = !!ui.store.state.cart.open;
    ui.store.onChange('cart', cart => {
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
      empty: !((_c = (_b = (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.pagination) === null || _c === void 0 ? void 0 : _c.count),
      order: google.state.checkout,
      lineItems: ((_e = (_d = google.state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) || [],
      tax_status: (_f = google.state.checkout) === null || _f === void 0 ? void 0 : _f.tax_status,
      customerShippingAddress: typeof ((_g = google.state.checkout) === null || _g === void 0 ? void 0 : _g.customer) !== 'string' ? (_j = (_h = google.state.checkout) === null || _h === void 0 ? void 0 : _h.customer) === null || _j === void 0 ? void 0 : _j.shipping_address : {},
      shippingAddress: (_k = google.state.checkout) === null || _k === void 0 ? void 0 : _k.shipping_address,
      taxStatus: (_l = google.state.checkout) === null || _l === void 0 ? void 0 : _l.tax_status,
      formId: this.formId,
    };
  }
  render() {
    return (index.h("sc-cart-session-provider", null, index.h("sc-drawer", { ref: el => (this.drawer = el), open: this.open, onScAfterHide: () => (this.open = false), onScAfterShow: () => (this.open = true) }, this.open === true && (index.h(index.Fragment, null, index.h("div", { class: "cart__header-suffix", slot: "header" }, index.h("slot", { name: "cart-header" }), index.h("sc-error", { style: { '--sc-alert-border-radius': '0' }, slot: "header" })), index.h("slot", null))), getters.formBusy() && index.h("sc-block-ui", { "z-index": 9 }))));
  }
  static get watchers() { return {
    "open": ["handleOpenChange"]
  }; }
};
ScCart.style = scCartCss;

exports.sc_cart = ScCart;

//# sourceMappingURL=sc-cart.cjs.entry.js.map
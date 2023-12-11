'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const google = require('./google-13aecc85.js');
const index$1 = require('./index-e302f7c9.js');
const getters = require('./getters-5c083014.js');
const store = require('./store-68346eb0.js');
const mutations = require('./mutations-957d9aea.js');
const fetch = require('./fetch-2dba325c.js');
const mutations$2 = require('./mutations-29dac4a7.js');
const mutations$1 = require('./mutations-2fd46f36.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
const watchers = require('./watchers-d7bdd741.js');
const formData = require('./form-data-69000afe.js');
const getQueryArg = require('./get-query-arg-53bf21e2.js');
require('./currency-2733c607.js');
require('./index-00f0fc21.js');
require('./utils-45815a15.js');
require('./watchers-eeca9c2e.js');
require('./getters-a4757e13.js');
require('./util-9c366e9f.js');

const scCheckoutStockAlertCss = ":host{display:block}sc-table{height:auto}h4{display:block;margin:0;font-weight:var(--sc-font-weight-bold);font-size:var(--sc-font-size-medium)}.stock-alert__image{width:50px;height:50px;object-fit:cover;margin-right:10px;display:block}.stock-alert__quantity{color:var(--sc-color-gray-500);font-weight:var(--sc-font-weight-bold);display:flex;align-items:center;justify-content:flex-end;gap:var(--sc-spacing-xx-small)}";

const ScCheckoutStockAlert = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scUpdateLineItem = index.createEvent(this, "scUpdateLineItem", 7);
    this.stockErrors = [];
    this.busy = undefined;
    this.error = undefined;
  }
  /** Get the out of stock line items. */
  getOutOfStockLineItems() {
    var _a, _b;
    return (((_b = (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) || []).filter(lineItem => {
      var _a, _b, _c;
      const product = (_a = lineItem.price) === null || _a === void 0 ? void 0 : _a.product;
      // no stock handling.
      if (!(product === null || product === void 0 ? void 0 : product.stock_enabled) || (product === null || product === void 0 ? void 0 : product.allow_out_of_stock_purchases))
        return;
      // check the variant stock.
      if ((_b = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _b === void 0 ? void 0 : _b.id) {
        return ((_c = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _c === void 0 ? void 0 : _c.available_stock) < lineItem.quantity;
      }
      return (product === null || product === void 0 ? void 0 : product.available_stock) < lineItem.quantity;
    });
  }
  /**
   * Update the checkout line items stock to the max available.
   */
  async onSubmit() {
    const lineItems = this.getOutOfStockLineItems().map(lineItem => {
      var _a, _b, _c;
      const product = (_a = lineItem.price) === null || _a === void 0 ? void 0 : _a.product;
      if ((_b = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _b === void 0 ? void 0 : _b.id) {
        return {
          ...lineItem,
          quantity: Math.max(((_c = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _c === void 0 ? void 0 : _c.available_stock) || 0, 0),
        };
      }
      return {
        ...lineItem,
        quantity: Math.max((product === null || product === void 0 ? void 0 : product.available_stock) || 0, 0),
      };
    });
    try {
      this.busy = true;
      google.state.checkout = (await index$1.updateCheckout({
        id: google.state.checkout.id,
        data: {
          line_items: (lineItems || [])
            .filter(lineItem => !!lineItem.quantity)
            .map(lineItem => {
            var _a, _b;
            return {
              id: lineItem.id,
              price_id: (_a = lineItem.price) === null || _a === void 0 ? void 0 : _a.id,
              quantity: lineItem.quantity,
              ...(((_b = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _b === void 0 ? void 0 : _b.id) ? { variant: lineItem.variant.id } : {}),
            };
          }),
        },
      }));
    }
    catch (error) {
      const additionalErrors = ((error === null || error === void 0 ? void 0 : error.additional_errors) || []).map(error => error === null || error === void 0 ? void 0 : error.message).filter(n => n);
      this.error = `${(error === null || error === void 0 ? void 0 : error.message) || wp.i18n.__('Something went wrong.', 'surecart')} ${(additionalErrors === null || additionalErrors === void 0 ? void 0 : additionalErrors.length) && ` ${additionalErrors.join('. ')}`}`;
    }
    finally {
      this.busy = false;
    }
  }
  render() {
    // stock errors.
    const stockErrors = (this.getOutOfStockLineItems() || []).map(lineItem => {
      var _a, _b, _c, _d, _e, _f;
      const product = (_a = lineItem.price) === null || _a === void 0 ? void 0 : _a.product;
      const variantImage = typeof ((_b = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _b === void 0 ? void 0 : _b.image) !== 'string' ? (_d = (_c = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _c === void 0 ? void 0 : _c.image) === null || _d === void 0 ? void 0 : _d.url : null;
      const available_stock = ((_e = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _e === void 0 ? void 0 : _e.id) ? (_f = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _f === void 0 ? void 0 : _f.available_stock : product === null || product === void 0 ? void 0 : product.available_stock;
      return {
        name: product === null || product === void 0 ? void 0 : product.name,
        image_url: variantImage || (product === null || product === void 0 ? void 0 : product.image_url),
        quantity: lineItem.quantity,
        available_stock,
      };
    });
    // we have at least one quantity change.
    const hasOutOfStockItems = stockErrors === null || stockErrors === void 0 ? void 0 : stockErrors.some(item => (item === null || item === void 0 ? void 0 : item.available_stock) < 1);
    return (index.h(index.Host, null, index.h("sc-dialog", { style: { '--body-spacing': 'var(--sc-spacing-x-large)' }, open: !!stockErrors.length && getters.currentFormState() === 'draft', noHeader: true, onScRequestClose: e => e.preventDefault() }, index.h("sc-dashboard-module", { class: "subscription-cancel", error: this.error, style: { '--sc-dashboard-module-spacing': '1em' } }, index.h("sc-flex", { slot: "heading", "align-items": "center", "justify-content": "flex-start" }, index.h("sc-icon", { name: "alert-circle", style: { color: 'var(--sc-color-primary-500' } }), hasOutOfStockItems ? wp.i18n.__('Out of Stock', 'surecart') : wp.i18n.__('Quantity Update', 'surecart')), index.h("span", { slot: "description" }, hasOutOfStockItems
      ? wp.i18n.__('Some items are no longer available. Your cart will be updated.', 'surecart')
      : wp.i18n.__('Available quantities for these items have changed. Your cart will be updated.', 'surecart')), index.h("sc-card", { "no-padding": true }, index.h("sc-table", null, index.h("sc-table-cell", { slot: "head" }, wp.i18n.__('Description', 'surecart')), index.h("sc-table-cell", { slot: "head", style: { width: '100px', textAlign: 'right' } }, wp.i18n.__('Quantity', 'surecart')), stockErrors.map((item, index$1) => {
      const isLastChild = index$1 === stockErrors.length - 1;
      return (index.h("sc-table-row", { style: { '--columns': '2', ...(isLastChild ? { border: 'none' } : {}) } }, index.h("sc-table-cell", null, index.h("sc-flex", { justifyContent: "flex-start", alignItems: "center" }, index.h("img", { class: "stock-alert__image", src: `https://surecart.com/cdn-cgi/image/fit=scale-down,format=auto,width=100/${item === null || item === void 0 ? void 0 : item.image_url}` }), index.h("h4", null, item.name))), index.h("sc-table-cell", { style: { width: '100px', textAlign: 'right' } }, index.h("span", { class: "stock-alert__quantity" }, index.h("span", null, item === null || item === void 0 ? void 0 : item.quantity), " ", index.h("sc-icon", { name: "arrow-right" }), " ", index.h("span", null, Math.max(item === null || item === void 0 ? void 0 : item.available_stock, 0))))));
    })))), index.h("sc-button", { slot: "footer", type: "primary", loading: this.busy, onClick: () => this.onSubmit() }, wp.i18n.__('Continue', 'surecart'), index.h("sc-icon", { name: "arrow-right", slot: "suffix" })), this.busy && index.h("sc-block-ui", { spinner: true }))));
  }
};
ScCheckoutStockAlert.style = scCheckoutStockAlertCss;

const ScCheckoutUnsavedChangesWarning = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.state = undefined;
  }
  /**
   * Add event listener for beforeunload.
   */
  componentDidLoad() {
    window.addEventListener('beforeunload', e => this.warnIfUnsavedChanges(e), { capture: true });
  }
  /**
   * Warn if status is updaing, finalizing, paying or confirming.
   */
  warnIfUnsavedChanges(e) {
    if (['updating', 'finalizing', 'confirming'].includes(this.state)) {
      console.log({ e });
      e.preventDefault();
      e.returnValue = wp.i18n.__('Your payment is processing. Exiting this page could cause an error in your order. Please do not navigate away from this page.', 'surecart');
      return e.returnValue;
    }
  }
};

const ScFormComponentsValidator = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.disabled = undefined;
    this.taxProtocol = undefined;
    this.hasAddress = undefined;
    this.hasTaxIDField = undefined;
    this.hasBumpsField = undefined;
    this.hasTaxLine = undefined;
    this.hasBumpLine = undefined;
    this.hasShippingChoices = undefined;
    this.hasShippingAmount = undefined;
  }
  handleOrderChange() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // bail if we don't have address invalid error or disabled.
    if (this.disabled)
      return;
    // make sure to add the address field if it's not there.
    if (((_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.tax_status) === 'address_invalid' || ((_b = google.state.checkout) === null || _b === void 0 ? void 0 : _b.shipping_enabled) || ((_c = google.state.checkout) === null || _c === void 0 ? void 0 : _c.shipping_address_required)) {
      this.addAddressField();
    }
    // add order bumps.
    if ((_f = (_e = (_d = google.state.checkout) === null || _d === void 0 ? void 0 : _d.recommended_bumps) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.length) {
      this.addBumps();
    }
    if (!!((_g = google.state.checkout) === null || _g === void 0 ? void 0 : _g.tax_amount)) {
      this.addTaxLine();
    }
    // add shipping choices.
    if (((_h = google.state.checkout) === null || _h === void 0 ? void 0 : _h.shipping_enabled) && ((_j = google.state.checkout) === null || _j === void 0 ? void 0 : _j.selected_shipping_choice_required)) {
      this.addShippingChoices();
    }
    if (!!((_k = google.state.checkout) === null || _k === void 0 ? void 0 : _k.shipping_amount)) {
      this.addShippingAmount();
    }
  }
  handleHasAddressChange() {
    if (!this.hasAddress)
      return;
    this.handleShippingAddressRequired();
  }
  componentWillLoad() {
    var _a, _b;
    this.hasAddress = !!this.el.querySelector('sc-order-shipping-address');
    this.hasTaxIDField = !!this.el.querySelector('sc-order-tax-id-input');
    this.hasBumpsField = !!this.el.querySelector('sc-order-bumps');
    this.hasTaxLine = !!this.el.querySelector('sc-line-item-tax');
    this.hasShippingChoices = !!this.el.querySelector('sc-shipping-choices');
    this.hasShippingAmount = !!this.el.querySelector('sc-line-item-shipping');
    // automatically add address field if tax is enabled.
    if ((_a = this.taxProtocol) === null || _a === void 0 ? void 0 : _a.tax_enabled) {
      this.addAddressField();
      // if eu vat is required, add the tax id field.
      if ((_b = this.taxProtocol) === null || _b === void 0 ? void 0 : _b.eu_vat_required) {
        this.addTaxIDField();
      }
    }
    this.removeCheckoutListener = google.onChange('checkout', () => this.handleOrderChange());
  }
  disconnectedCallback() {
    this.removeCheckoutListener();
  }
  handleShippingAddressRequired() {
    var _a;
    if (!((_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.shipping_address_required))
      return;
    // get the address
    const address = this.el.querySelector('sc-order-shipping-address');
    if (!address)
      return;
    // require the address.
    address.required = true;
    // if we have a customer name field, require that.
    const customerName = this.el.querySelector('sc-customer-name');
    if (!!customerName) {
      customerName.required = true;
      return;
    }
    // require the name and show the name input.
    address.requireName = true;
    address.showName = true;
  }
  addAddressField() {
    if (this.hasAddress) {
      return;
    }
    const payment = this.el.querySelector('sc-payment');
    const address = document.createElement('sc-order-shipping-address');
    address.label = wp.i18n.__('Address', 'surecart');
    payment.parentNode.insertBefore(address, payment);
    this.hasAddress = true;
  }
  addTaxIDField() {
    if (this.hasTaxIDField)
      return;
    const payment = this.el.querySelector('sc-payment');
    const taxInput = document.createElement('sc-order-tax-id-input');
    payment.parentNode.insertBefore(taxInput, payment);
    this.hasTaxIDField = true;
  }
  addBumps() {
    if (this.hasBumpsField)
      return;
    const payment = this.el.querySelector('sc-payment');
    const bumps = document.createElement('sc-order-bumps');
    payment.parentNode.insertBefore(bumps, payment.nextSibling);
    this.hasBumpsField = true;
  }
  addTaxLine() {
    var _a;
    if (this.hasTaxLine)
      return;
    const total = this.el.querySelector('sc-line-item-total[total=total]');
    const tax = document.createElement('sc-line-item-tax');
    if (((_a = total === null || total === void 0 ? void 0 : total.previousElementSibling) === null || _a === void 0 ? void 0 : _a.tagName) === 'SC-DIVIDER') {
      total.parentNode.insertBefore(tax, total.previousElementSibling);
    }
    else {
      total.parentNode.insertBefore(tax, total);
    }
    this.hasTaxLine = true;
  }
  addShippingChoices() {
    if (this.hasShippingChoices)
      return;
    const payment = this.el.querySelector('sc-payment');
    const shippingChoices = document.createElement('sc-shipping-choices');
    payment.parentNode.insertBefore(shippingChoices, payment);
    this.hasShippingChoices = true;
  }
  addShippingAmount() {
    var _a;
    if (this.hasShippingAmount)
      return;
    let insertBeforeElement = this.el.querySelector('sc-line-item-tax');
    const total = this.el.querySelector('sc-line-item-total[total=total]');
    if (!insertBeforeElement) {
      insertBeforeElement = ((_a = total === null || total === void 0 ? void 0 : total.previousElementSibling) === null || _a === void 0 ? void 0 : _a.tagName) === 'SC-DIVIDER' ? total.previousElementSibling : total;
    }
    const shippingAmount = document.createElement('sc-line-item-shipping');
    insertBeforeElement.parentNode.insertBefore(shippingAmount, insertBeforeElement);
    this.hasShippingAmount = true;
  }
  render() {
    return index.h("slot", null);
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "hasAddress": ["handleHasAddressChange"]
  }; }
};

const ScFormErrorProvider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    this.maybeAddErrorsComponent();
  }
  maybeAddErrorsComponent() {
    var _a, _b;
    if (!!this.el.querySelector('sc-checkout-form-errors'))
      return;
    const errorsComponent = document.createElement('sc-checkout-form-errors');
    (_b = (_a = this.el.querySelector('sc-form')) === null || _a === void 0 ? void 0 : _a.prepend) === null || _b === void 0 ? void 0 : _b.call(_a, errorsComponent);
  }
  render() {
    return index.h("slot", null);
  }
  get el() { return index.getElement(this); }
};

const ScFormStateProvider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scSetCheckoutFormState = index.createEvent(this, "scSetCheckoutFormState", 7);
    /** Holds our state machine service */
    this._stateService = store.v(store.checkoutMachine);
    this.checkoutState = store.checkoutMachine.initialState;
  }
  /** Set the state. */
  setState(name) {
    const { send } = this._stateService;
    mutations.updateFormState(name);
    return send(name);
  }
  /** Watch for checkout state changes and emit to listeners. */
  handleCheckoutStateChange(state) {
    this.scSetCheckoutFormState.emit(state.value);
  }
  /** Init the state service. */
  componentWillLoad() {
    // Start state machine.
    this._stateService.subscribe(state => (this.checkoutState = state));
    this._stateService.start();
  }
  /** Remove state machine on disconnect. */
  disconnectedCallback() {
    this._stateService.stop();
  }
  /** Allow children to set the form state. */
  handleSetStateEvent(e) {
    this.setState(e.detail);
  }
  /** Update the state when the order is paid. */
  async handlePaid() {
    this.setState('PAID');
  }
  render() {
    // handle expired.
    if (this.checkoutState.value === 'expired') {
      return (index.h("sc-block-ui", null, index.h("div", null, wp.i18n.__('Please refresh the page.', 'surecart'))));
    }
    return index.h("slot", null);
  }
  static get watchers() { return {
    "checkoutState": ["handleCheckoutStateChange"]
  }; }
};

const scLoginProviderCss = ":host{display:block}";

const ScLoginProvider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scSetLoggedIn = index.createEvent(this, "scSetLoggedIn", 7);
    this.scSetCustomer = index.createEvent(this, "scSetCustomer", 7);
    this.loggedIn = undefined;
    this.order = undefined;
    this.notice = undefined;
    this.open = undefined;
    this.loading = undefined;
    this.error = undefined;
  }
  /** Listen for open event. */
  handleLoginPrompt() {
    this.open = true;
  }
  /** Focus on first input. */
  handleLoginDialogChange(val) {
    if (val) {
      setTimeout(() => {
        this.loginForm.querySelector('sc-input').triggerFocus();
      }, 100);
    }
  }
  handleLoggedInChange(val, prev) {
    if (prev === false && val) {
      this.notice = true;
    }
  }
  handleOrderChange(val, prev) {
    if ((val === null || val === void 0 ? void 0 : val.updated_at) !== (prev === null || prev === void 0 ? void 0 : prev.updated_at)) {
      this.notice = false;
    }
  }
  /** Handle form submit. */
  async handleFormSubmit(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.error = null;
    const { login, password } = await e.target.getFormJson();
    try {
      this.loading = true;
      const { name, email } = (await fetch.apiFetch({
        method: 'POST',
        path: 'surecart/v1/login',
        data: {
          login,
          password,
        },
      }));
      this.scSetLoggedIn.emit(true);
      this.scSetCustomer.emit({ name, email });
      this.open = false;
    }
    catch (e) {
      console.error(e);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.loading = false;
    }
  }
  render() {
    return (index.h(index.Host, null, !!this.notice && (index.h("sc-alert", { type: "success", open: true, style: { marginBottom: 'var(--sc-form-row-spacing)' }, closable: true }, index.h("span", { slot: "title" }, wp.i18n.__('Welcome back!', 'surecart')), wp.i18n.__('You have logged in successfully.', 'surecart'))), index.h("slot", null), !this.loggedIn && (index.h("sc-dialog", { label: wp.i18n.__('Login to your account', 'surecart'), open: this.open, onScRequestClose: () => (this.open = false) }, index.h("sc-form", { ref: el => (this.loginForm = el), onScFormSubmit: e => {
        e.preventDefault();
        e.stopImmediatePropagation();
      }, onScSubmit: e => this.handleFormSubmit(e) }, !!this.error && (index.h("sc-alert", { type: "danger", open: !!this.error }, this.error)), index.h("sc-input", { label: wp.i18n.__('Email or Username', 'surecart'), type: "text", name: "login", required: true, autofocus: this.open }), index.h("sc-input", { label: wp.i18n.__('Password', 'surecart'), type: "password", name: "password", required: true }), index.h("sc-button", { type: "primary", full: true, loading: this.loading, submit: true }, wp.i18n.__('Login', 'surecart')))))));
  }
  static get watchers() { return {
    "open": ["handleLoginDialogChange"],
    "loggedIn": ["handleLoggedInChange"],
    "order": ["handleOrderChange"]
  }; }
};
ScLoginProvider.style = scLoginProviderCss;

const scOrderConfirmProviderCss = ".confirm__icon{margin-bottom:var(--sc-spacing-medium);display:flex;justify-content:center}.confirm__icon-container{background:var(--sc-color-primary-500);width:55px;height:55px;border-radius:999999px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:1;color:white}sc-dialog::part(overlay){backdrop-filter:blur(4px)}";

const ScOrderConfirmProvider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scOrderPaid = index.createEvent(this, "scOrderPaid", 7);
    this.scSetState = index.createEvent(this, "scSetState", 7);
    this.showSuccessModal = false;
    this.checkoutStatus = undefined;
    this.successUrl = undefined;
  }
  /**
   * Watch for paid checkout machine state.
   * This is triggered by Stripe, Paypal or Paystack when payment succeeds.
   */
  handleConfirmOrderEvent() {
    if (this.checkoutStatus === 'confirming') {
      this.confirmOrder();
    }
  }
  /** Confirm the order. */
  async confirmOrder() {
    var _a, _b, _c;
    try {
      google.state.checkout = (await fetch.apiFetch({
        method: 'PATCH',
        path: addQueryArgs.addQueryArgs(`surecart/v1/checkouts/${(_a = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _a === void 0 ? void 0 : _a.id}/confirm`, { expand: index$1.expand }),
      }));
      this.scSetState.emit('CONFIRMED');
    }
    catch (e) {
      console.error(e);
      mutations$1.createErrorNotice(e);
    }
    finally {
      // always clear the checkout.
      mutations$2.clearCheckout();
      // get success url.
      const successUrl = ((_c = (_b = google.state.checkout) === null || _b === void 0 ? void 0 : _b.metadata) === null || _c === void 0 ? void 0 : _c.success_url) || this.successUrl;
      if (successUrl) {
        // set state to redirecting.
        this.scSetState.emit('REDIRECT');
        setTimeout(() => { var _a; return window.location.assign(addQueryArgs.addQueryArgs(successUrl, { sc_order: (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.id })); }, 50);
      }
      else {
        this.showSuccessModal = true;
      }
    }
  }
  getSuccessUrl() {
    var _a, _b, _c, _d, _e;
    const url = ((_b = (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.metadata) === null || _b === void 0 ? void 0 : _b.success_url) || this.successUrl;
    return url ? addQueryArgs.addQueryArgs(url, { sc_order: (_c = google.state.checkout) === null || _c === void 0 ? void 0 : _c.id }) : (_e = (_d = window === null || window === void 0 ? void 0 : window.scData) === null || _d === void 0 ? void 0 : _d.pages) === null || _e === void 0 ? void 0 : _e.dashboard;
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    const manualPaymentMethod = (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.manual_payment_method;
    return (index.h(index.Host, null, index.h("slot", null), index.h("sc-dialog", { open: !!this.showSuccessModal, style: { '--body-spacing': 'var(--sc-spacing-xxx-large)' }, noHeader: true, onScRequestClose: e => e.preventDefault() }, index.h("div", { class: "confirm__icon" }, index.h("div", { class: "confirm__icon-container" }, index.h("sc-icon", { name: "check" }))), index.h("sc-dashboard-module", { heading: ((_c = (_b = store.state === null || store.state === void 0 ? void 0 : store.state.text) === null || _b === void 0 ? void 0 : _b.success) === null || _c === void 0 ? void 0 : _c.title) || wp.i18n.__('Thanks for your order!', 'surecart'), style: { '--sc-dashboard-module-spacing': 'var(--sc-spacing-x-large)', 'textAlign': 'center' } }, index.h("span", { slot: "description" }, ((_e = (_d = store.state === null || store.state === void 0 ? void 0 : store.state.text) === null || _d === void 0 ? void 0 : _d.success) === null || _e === void 0 ? void 0 : _e.description) || wp.i18n.__('Your payment was successful, and your order is complete. A receipt is on its way to your inbox.', 'surecart')), !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name) && !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions) && (index.h("sc-alert", { type: "info", open: true, style: { 'text-align': 'left' } }, index.h("span", { slot: "title" }, manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name), manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 :
      manualPaymentMethod.instructions.split('\n').map(i => {
        return index.h("p", null, i);
      }))), index.h("sc-button", { href: this.getSuccessUrl(), size: "large", type: "primary" }, ((_g = (_f = store.state === null || store.state === void 0 ? void 0 : store.state.text) === null || _f === void 0 ? void 0 : _f.success) === null || _g === void 0 ? void 0 : _g.button) || wp.i18n.__('Continue', 'surecart'), index.h("sc-icon", { name: "arrow-right", slot: "suffix" }))))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "checkoutStatus": ["handleConfirmOrderEvent"]
  }; }
};
ScOrderConfirmProvider.style = scOrderConfirmProviderCss;

const ScSessionProvider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scUpdateOrderState = index.createEvent(this, "scUpdateOrderState", 7);
    this.scUpdateDraftState = index.createEvent(this, "scUpdateDraftState", 7);
    this.scPaid = index.createEvent(this, "scPaid", 7);
    this.scSetState = index.createEvent(this, "scSetState", 7);
    this.prices = [];
    this.persist = true;
  }
  handlePricesChange() {
    let line_items = this.addInitialPrices() || [];
    // line_items = this.addPriceChoices(line_items);
    if (!(line_items === null || line_items === void 0 ? void 0 : line_items.length)) {
      return;
    }
    return this.loadUpdate({ line_items });
  }
  /**
   * Finalize the order.
   *
   * @returns {Promise<Order>}
   */
  async finalize() {
    return await this.handleFormSubmit();
  }
  async getFormData() {
    let data = {};
    const form = this.el.querySelector('sc-form');
    if (form) {
      const json = await form.getFormJson();
      data = formData.parseFormData(json);
    }
    return data;
  }
  /**
   * Handles the form submission.
   * @param e
   */
  async handleFormSubmit() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    mutations$1.removeNotice();
    mutations.updateFormState('FINALIZE');
    // Get current form state.
    let data = await this.getFormData();
    if (((_a = window === null || window === void 0 ? void 0 : window.scData) === null || _a === void 0 ? void 0 : _a.recaptcha_site_key) && (window === null || window === void 0 ? void 0 : window.grecaptcha)) {
      try {
        data['grecaptcha'] = await window.grecaptcha.execute(window.scData.recaptcha_site_key, { action: 'surecart_checkout_submit' });
      }
      catch (e) {
        console.error(e);
        mutations.updateFormState('REJECT');
        this.handleErrorResponse(e);
        return new Error(e === null || e === void 0 ? void 0 : e.message);
      }
    }
    // first lets make sure the session is updated before we process it.
    try {
      await this.update(data);
    }
    catch (e) {
      console.error(e);
      mutations.updateFormState('REJECT');
      this.handleErrorResponse(e);
    }
    // first validate server-side and get key
    try {
      google.state.checkout = await index$1.finalizeCheckout({
        id: (_b = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _b === void 0 ? void 0 : _b.id,
        query: {
          ...((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.method) ? { payment_method_type: watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.method } : {}),
          return_url: addQueryArgs.addQueryArgs(window.location.href, {
            ...(((_c = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _c === void 0 ? void 0 : _c.id) ? { checkout_id: (_d = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _d === void 0 ? void 0 : _d.id } : {}),
            is_surecart_payment_redirect: true,
          }),
        },
        data,
        processor: {
          id: watchers.state.id,
          manual: watchers.state.manual,
        },
      });
      // the checkout is paid.
      if (['paid', 'processing'].includes((_e = google.state.checkout) === null || _e === void 0 ? void 0 : _e.status)) {
        this.scPaid.emit();
      }
      if ((_j = (_h = (_g = (_f = google.state.checkout) === null || _f === void 0 ? void 0 : _f.payment_intent) === null || _g === void 0 ? void 0 : _g.processor_data) === null || _h === void 0 ? void 0 : _h.mollie) === null || _j === void 0 ? void 0 : _j.checkout_url) {
        mutations.updateFormState('PAYING');
        return setTimeout(() => { var _a, _b, _c, _d; return window.location.assign((_d = (_c = (_b = (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data) === null || _c === void 0 ? void 0 : _c.mollie) === null || _d === void 0 ? void 0 : _d.checkout_url); }, 50);
      }
      setTimeout(() => {
        mutations.updateFormState('PAYING');
      }, 50);
      return google.state.checkout;
    }
    catch (e) {
      console.error(e);
      this.handleErrorResponse(e);
      return new Error(e === null || e === void 0 ? void 0 : e.message);
    }
  }
  /**
   * Handle paid event and update the
   */
  async handlePaid() {
    mutations.updateFormState('PAID');
  }
  async handleAbandonedCartUpdate(e) {
    const abandoned_checkout_enabled = e.detail;
    this.loadUpdate({
      abandoned_checkout_enabled,
    });
  }
  /** Handles coupon updates. */
  async handleCouponApply(e) {
    const promotion_code = e.detail;
    mutations$1.removeNotice();
    this.loadUpdate({
      discount: {
        ...(promotion_code ? { promotion_code } : {}),
      },
    });
  }
  /** Find or create session on load. */
  componentDidLoad() {
    this.findOrCreateOrder();
  }
  /** Find or create an order */
  async findOrCreateOrder() {
    var _a;
    // get URL params.
    const { redirect_status, checkout_id, line_items, coupon, is_surecart_payment_redirect } = addQueryArgs.getQueryArgs(window.location.href);
    // remove params we don't want.
    window.history.replaceState({}, document.title, google.removeQueryArgs(window.location.href, 'redirect_status', 'coupon', 'line_items', 'confirm_checkout_id', 'checkout_id', 'no_cart'));
    // handle abandoned checkout.
    if (!!is_surecart_payment_redirect && !!checkout_id) {
      mutations.updateFormState('FINALIZE');
      mutations.updateFormState('PAYING');
      return this.handleCheckoutIdFromUrl(checkout_id, coupon);
    }
    // handle redirect status.
    if (!!redirect_status) {
      return this.handleRedirectStatus(redirect_status, checkout_id);
    }
    // handle abandoned checkout.
    if (!!checkout_id) {
      return this.handleCheckoutIdFromUrl(checkout_id, coupon);
    }
    // handle initial line items.
    if (!!line_items) {
      return this.handleInitialLineItems(line_items, coupon);
    }
    // we have an existing saved checkout id in the session, and we are persisting.
    const id = (_a = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _a === void 0 ? void 0 : _a.id;
    if (id && this.persist) {
      return this.handleExistingCheckout(id, coupon);
    }
    return this.handleNewCheckout(coupon);
  }
  /** Handle payment instrument redirect status */
  async handleRedirectStatus(status, id) {
    var _a, _b;
    console.info('Handling payment redirect.');
    // status failed.
    if (status === 'failed') {
      mutations$1.createErrorNotice(wp.i18n.__('Payment unsuccessful. Please try again.', 'surecart'));
      return;
    }
    // get the
    if (!id) {
      mutations$1.createErrorNotice(wp.i18n.__('Could not find checkout. Please contact us before attempting to purchase again.', 'surecart'));
      return;
    }
    // success, refetch the checkout
    try {
      mutations.updateFormState('FINALIZE');
      mutations.updateFormState('PAID');
      google.state.checkout = (await index$1.fetchCheckout({
        id,
        query: {
          refresh_status: true,
        },
      }));
      // TODO: should we even check this?
      if (((_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.status) && ['paid', 'processing'].includes((_b = google.state.checkout) === null || _b === void 0 ? void 0 : _b.status)) {
        setTimeout(() => {
          this.scPaid.emit();
        }, 100);
      }
    }
    catch (e) {
      this.handleErrorResponse(e);
    }
  }
  /** Handle abandoned checkout from URL */
  async handleCheckoutIdFromUrl(id, promotion_code = '') {
    var _a, _b;
    console.info('Handling existing checkout from url.', promotion_code, id);
    // if coupon code, load the checkout with the code.
    if (promotion_code) {
      return this.loadUpdate({
        id,
        discount: { promotion_code },
        refresh_price_versions: true,
      });
    }
    try {
      mutations.updateFormState('FETCH');
      google.state.checkout = (await index$1.fetchCheckout({
        id,
        query: {
          refresh_status: true,
        },
      }));
      const isModeMismatch = google.state.mode !== (((_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.live_mode) ? 'live' : 'test');
      if (isModeMismatch) {
        console.info('Mode mismatch, creating new checkout.');
        mutations$2.clearCheckout();
        google.state.checkout = null;
        await this.handleNewCheckout(promotion_code);
        return;
      }
      mutations.updateFormState('RESOLVE');
    }
    catch (e) {
      this.handleErrorResponse(e);
    }
    // handle status.
    switch ((_b = google.state.checkout) === null || _b === void 0 ? void 0 : _b.status) {
      case 'paid':
      case 'processing':
        return setTimeout(() => {
          mutations.updateFormState('FINALIZE');
          mutations.updateFormState('PAID');
          this.scPaid.emit();
        }, 100);
      case 'payment_failed':
        mutations$2.clearCheckout();
        mutations$1.createErrorNotice({
          message: wp.i18n.__('Payment unsuccessful. Please try again.', 'surecart'),
        });
        return;
      case 'payment_intent_canceled':
      case 'canceled':
        mutations$2.clearCheckout();
        mutations$1.createErrorNotice({
          message: wp.i18n.__('Payment canceled. Please try again.', 'surecart'),
        });
        return;
      case 'finalized':
        mutations$1.createErrorNotice({
          message: wp.i18n.__('Payment unsuccessful. Please try again.', 'surecart'),
        });
        mutations.updateFormState('REJECT');
        return;
    }
  }
  /** Handle line items (and maybe ) */
  async handleInitialLineItems(line_items, promotion_code) {
    console.info('Handling initial line items.');
    // TODO: move this to central store.
    const address = this.el.querySelector('sc-order-shipping-address');
    mutations$2.clearCheckout();
    return this.loadUpdate({
      line_items,
      refresh_price_versions: true,
      ...(promotion_code ? { discount: { promotion_code } } : {}),
      ...((address === null || address === void 0 ? void 0 : address.defaultCountry)
        ? {
          shipping_address: {
            country: address === null || address === void 0 ? void 0 : address.defaultCountry,
          },
        }
        : {}),
    });
  }
  /** Handle a brand new checkout. */
  async handleNewCheckout(promotion_code) {
    var _a;
    // get existing form data from defaults (default country selection, etc).
    const data = this.getFormData();
    let line_items = google.state.initialLineItems || [];
    const address = this.el.querySelector('sc-order-shipping-address');
    try {
      mutations.updateFormState('FETCH');
      google.state.checkout = (await index$1.createOrUpdateCheckout({
        data: {
          ...data,
          ...(promotion_code ? { discount: { promotion_code } } : {}),
          ...((address === null || address === void 0 ? void 0 : address.defaultCountry)
            ? {
              shipping_address: {
                country: address === null || address === void 0 ? void 0 : address.defaultCountry,
              },
            }
            : {}),
          line_items,
          ...(((_a = google.state.taxProtocol) === null || _a === void 0 ? void 0 : _a.eu_vat_required) ? { tax_identifier: { number_type: 'eu_vat' } } : {}),
        },
      }));
      mutations.updateFormState('RESOLVE');
    }
    catch (e) {
      console.error(e);
      this.handleErrorResponse(e);
    }
  }
  /** Handle existing checkout */
  async handleExistingCheckout(id, promotion_code) {
    var _a;
    if (!id)
      return this.handleNewCheckout(promotion_code);
    console.info('Handling existing checkout.');
    try {
      mutations.updateFormState('FETCH');
      google.state.checkout = (await index$1.createOrUpdateCheckout({
        id,
        data: {
          ...(promotion_code ? { discount: { promotion_code } } : {}),
          refresh_price_versions: true,
          ...(((_a = google.state.taxProtocol) === null || _a === void 0 ? void 0 : _a.eu_vat_required) ? { tax_identifier: { number_type: 'eu_vat' } } : {}),
        },
      }));
      mutations.updateFormState('RESOLVE');
    }
    catch (e) {
      console.error(e);
      this.handleErrorResponse(e);
    }
  }
  /** Handle the error response. */
  async handleErrorResponse(e) {
    var _a, _b, _c, _d;
    // reinitalize if order not found.
    if (['checkout.not_found'].includes(e === null || e === void 0 ? void 0 : e.code)) {
      window.history.replaceState({}, document.title, google.removeQueryArgs(window.location.href, 'checkout_id'));
      mutations$2.clearCheckout();
      return this.handleNewCheckout(false);
    }
    // one of these is an old price version error.
    if (((e === null || e === void 0 ? void 0 : e.additional_errors) || []).some(error => (error === null || error === void 0 ? void 0 : error.code) == 'checkout.price.old_version')) {
      await this.loadUpdate({
        id: (_a = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _a === void 0 ? void 0 : _a.id,
        data: {
          status: 'draft',
          refresh_price_versions: true,
        },
      });
      mutations$1.createInfoNotice(wp.i18n.__('The price a product in your order has changed. We have adjusted your order to the new price.', 'surecart'));
      return;
    }
    // If got Product out of stock error, then fetch the checkout again.
    if (((_c = (_b = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.code) === 'checkout.product.out_of_stock') {
      this.fetch();
      mutations.updateFormState('REJECT');
      return;
    }
    if (['order.invalid_status_transition'].includes(e === null || e === void 0 ? void 0 : e.code)) {
      await this.loadUpdate({
        id: (_d = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _d === void 0 ? void 0 : _d.id,
        data: {
          status: 'draft',
        },
      });
      this.handleFormSubmit();
      return;
    }
    // expired
    if ((e === null || e === void 0 ? void 0 : e.code) === 'rest_cookie_invalid_nonce') {
      mutations.updateFormState('EXPIRE');
      return;
    }
    // paid
    if ((e === null || e === void 0 ? void 0 : e.code) === 'readonly') {
      mutations$2.clearCheckout();
      window.location.assign(google.removeQueryArgs(window.location.href, 'order'));
      return;
    }
    mutations$1.createErrorNotice(e);
    mutations.updateFormState('REJECT');
  }
  /** Looks through children and finds items needed for initial session. */
  async initialize(args = {}) {
    let line_items = google.state.initialLineItems || [];
    return this.loadUpdate({ ...((line_items === null || line_items === void 0 ? void 0 : line_items.length) ? { line_items } : {}), ...args });
  }
  /** Add prices that are passed into the component. */
  addInitialPrices() {
    var _a;
    if (!((_a = this === null || this === void 0 ? void 0 : this.prices) === null || _a === void 0 ? void 0 : _a.length))
      return [];
    // check for id
    if (this.prices.some(p => !(p === null || p === void 0 ? void 0 : p.id))) {
      return;
    }
    // add prices that are passed into this component.
    return this.prices.map(price => {
      return {
        price_id: price.id,
        quantity: price.quantity,
        variant: price.variant,
      };
    });
  }
  // /** Add default prices that may be selected in form. */
  // addPriceChoices(line_items = []) {
  //   // const elements = this.el.querySelectorAll('[price-id]') as any;
  //   // elements.forEach(el => {
  //   //   // handle price choices.
  //   //   if (el.checked) {
  //   //     line_items.push({
  //   //       quantity: el.quantity || 1,
  //   //       price_id: el.priceId,
  //   //       ...(el.defaultAmount ? { ad_hoc_amount: el.defaultAmount } : {}),
  //   //     });
  //   //   }
  //   //   // handle donation default amount.
  //   //   if (el.defaultAmount) {
  //   //     line_items.push({
  //   //       quantity: el.quantity || 1,
  //   //       price_id: el.priceId,
  //   //       ad_hoc_amount: el.defaultAmount,
  //   //     });
  //   //   }
  //   // });
  //   // return line_items;
  // }
  getSessionId() {
    var _a, _b;
    // check url first.
    const checkoutId = getQueryArg.getQueryArg(window.location.href, 'checkout_id');
    if (!!checkoutId) {
      return checkoutId;
    }
    // check existing order.
    if ((_a = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _a === void 0 ? void 0 : _a.id) {
      return (_b = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _b === void 0 ? void 0 : _b.id;
    }
    // we don't have and order id.
    return null;
  }
  async fetchCheckout(id, { query = {}, data = {} } = {}) {
    try {
      mutations.updateFormState('FETCH');
      const checkout = (await index$1.createOrUpdateCheckout({
        id,
        query,
        data,
      }));
      mutations.updateFormState('RESOLVE');
      return checkout;
    }
    catch (e) {
      this.handleErrorResponse(e);
    }
  }
  /** Fetch a session. */
  async fetch(query = {}) {
    try {
      mutations.updateFormState('FETCH');
      google.state.checkout = (await index$1.fetchCheckout({
        id: this.getSessionId(),
        query,
      }));
      mutations.updateFormState('RESOLVE');
    }
    catch (e) {
      this.handleErrorResponse(e);
    }
  }
  /** Update a session */
  async update(data = {}, query = {}) {
    try {
      google.state.checkout = (await index$1.createOrUpdateCheckout({
        id: (data === null || data === void 0 ? void 0 : data.id) ? data.id : this.getSessionId(),
        data,
        query,
      }));
    }
    catch (e) {
      // reinitalize if order not found.
      if (['checkout.not_found'].includes(e === null || e === void 0 ? void 0 : e.code)) {
        mutations$2.clearCheckout();
        return this.initialize();
      }
      console.error(e);
      throw e;
    }
  }
  /** Updates a session with loading status changes. */
  async loadUpdate(data = {}) {
    try {
      mutations.updateFormState('FETCH');
      await this.update(data);
      mutations.updateFormState('RESOLVE');
    }
    catch (e) {
      this.handleErrorResponse(e);
    }
  }
  render() {
    return (index.h("sc-line-items-provider", { order: google.state === null || google.state === void 0 ? void 0 : google.state.checkout, onScUpdateLineItems: e => this.loadUpdate({ line_items: e.detail }) }, index.h("slot", null)));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "prices": ["handlePricesChange"]
  }; }
};

exports.sc_checkout_stock_alert = ScCheckoutStockAlert;
exports.sc_checkout_unsaved_changes_warning = ScCheckoutUnsavedChangesWarning;
exports.sc_form_components_validator = ScFormComponentsValidator;
exports.sc_form_error_provider = ScFormErrorProvider;
exports.sc_form_state_provider = ScFormStateProvider;
exports.sc_login_provider = ScLoginProvider;
exports.sc_order_confirm_provider = ScOrderConfirmProvider;
exports.sc_session_provider = ScSessionProvider;

//# sourceMappingURL=sc-checkout-stock-alert_8.cjs.entry.js.map
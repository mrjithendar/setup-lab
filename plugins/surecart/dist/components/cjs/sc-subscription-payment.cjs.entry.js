'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const fetch = require('./fetch-2dba325c.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');

const scSubscriptionPaymentCss = ":host{display:block;position:relative}.subscription-payment{display:grid;gap:0.5em}";

const ScSubscriptionPayment = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.subscriptionId = undefined;
    this.backUrl = undefined;
    this.successUrl = undefined;
    this.subscription = undefined;
    this.paymentMethods = [];
    this.customerIds = [];
    this.loading = undefined;
    this.busy = undefined;
    this.error = undefined;
  }
  componentWillLoad() {
    this.fetchItems();
  }
  async fetchItems() {
    try {
      this.loading = true;
      await Promise.all([this.fetchSubscription(), this.fetchPaymentMethods()]);
    }
    catch (e) {
      console.error(e);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.loading = false;
    }
  }
  async fetchSubscription() {
    if (!this.subscriptionId)
      return;
    this.subscription = (await fetch.apiFetch({
      path: addQueryArgs.addQueryArgs(`/surecart/v1/subscriptions/${this.subscriptionId}`, {
        expand: ['price', 'price.product', 'current_period', 'product'],
      }),
    }));
  }
  async fetchPaymentMethods() {
    var _a;
    this.paymentMethods = (await fetch.apiFetch({
      path: addQueryArgs.addQueryArgs(`/surecart/v1/payment_methods`, {
        expand: ['card', 'customer', 'billing_agreement', 'paypal_account', 'payment_instrument', 'bank_account'],
        customer_ids: this.customerIds,
        reusable: true,
        ...(((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode) !== null ? { live_mode: this.subscription.live_mode } : {}),
      }),
    }));
  }
  async handleSubmit(e) {
    var _a;
    const { method } = await e.target.getFormJson();
    try {
      this.error = '';
      this.busy = true;
      await fetch.apiFetch({
        path: `/surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}`,
        method: 'PATCH',
        data: {
          payment_method: method,
        },
      });
      if (this.successUrl) {
        window.location.assign(this.successUrl);
      }
      else {
        this.busy = false;
      }
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
      this.busy = false;
    }
  }
  renderLoading() {
    return (index.h(index.Fragment, null, index.h("sc-choice", { name: "loading", disabled: true }, index.h("sc-skeleton", { style: { width: '60px', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '80px', display: 'inline-block' }, slot: "price" }), index.h("sc-skeleton", { style: { width: '120px', display: 'inline-block' }, slot: "description" })), index.h("sc-button", { type: "primary", full: true, submit: true, loading: true, busy: true }), !!this.backUrl && index.h("sc-button", { href: this.backUrl, full: true, loading: true, busy: true })));
  }
  renderContent() {
    if (this.loading) {
      return this.renderLoading();
    }
    const modeMethods = this.paymentMethods.filter(method => { var _a; return (method === null || method === void 0 ? void 0 : method.live_mode) === ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode); });
    if (!(modeMethods === null || modeMethods === void 0 ? void 0 : modeMethods.length)) {
      return (index.h(index.Fragment, null, index.h("sc-empty", { icon: "credit-card" }, wp.i18n.__('You have no saved payment methods.', 'surecart')), !!this.backUrl && (index.h("sc-button", { href: this.backUrl, full: true }, wp.i18n.__('Go Back', 'surecart')))));
    }
    return (index.h(index.Fragment, null, index.h("sc-choices", null, index.h("div", null, (this.paymentMethods || []).map(method => {
      var _a, _b;
      if ((method === null || method === void 0 ? void 0 : method.live_mode) !== ((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode))
        return null;
      return (index.h("sc-choice", { checked: ((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.payment_method) === (method === null || method === void 0 ? void 0 : method.id), name: "method", value: method === null || method === void 0 ? void 0 : method.id }, index.h("sc-payment-method", { paymentMethod: method, full: true })));
    }))), index.h("sc-button", { type: "primary", full: true, submit: true, loading: this.loading || this.busy, disabled: this.loading || this.busy }, wp.i18n.__('Update', 'surecart')), !!this.backUrl && (index.h("sc-button", { href: this.backUrl, full: true, loading: this.loading || this.busy, disabled: this.loading || this.busy }, wp.i18n.__('Go Back', 'surecart')))));
  }
  render() {
    return (index.h("sc-dashboard-module", { heading: wp.i18n.__('Select a payment method', 'surecart'), class: "subscription-payment", error: this.error }, index.h("sc-form", { onScFormSubmit: e => this.handleSubmit(e) }, index.h("sc-card", null, this.renderContent())), this.busy && index.h("sc-block-ui", null)));
  }
};
ScSubscriptionPayment.style = scSubscriptionPaymentCss;

exports.sc_subscription_payment = ScSubscriptionPayment;

//# sourceMappingURL=sc-subscription-payment.cjs.entry.js.map
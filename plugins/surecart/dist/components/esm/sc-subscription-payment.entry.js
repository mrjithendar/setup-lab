import { r as registerInstance, h, F as Fragment } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';

const scSubscriptionPaymentCss = ":host{display:block;position:relative}.subscription-payment{display:grid;gap:0.5em}";

const ScSubscriptionPayment = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    this.subscription = (await apiFetch({
      path: addQueryArgs(`/surecart/v1/subscriptions/${this.subscriptionId}`, {
        expand: ['price', 'price.product', 'current_period', 'product'],
      }),
    }));
  }
  async fetchPaymentMethods() {
    var _a;
    this.paymentMethods = (await apiFetch({
      path: addQueryArgs(`/surecart/v1/payment_methods`, {
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
      await apiFetch({
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
    return (h(Fragment, null, h("sc-choice", { name: "loading", disabled: true }, h("sc-skeleton", { style: { width: '60px', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '80px', display: 'inline-block' }, slot: "price" }), h("sc-skeleton", { style: { width: '120px', display: 'inline-block' }, slot: "description" })), h("sc-button", { type: "primary", full: true, submit: true, loading: true, busy: true }), !!this.backUrl && h("sc-button", { href: this.backUrl, full: true, loading: true, busy: true })));
  }
  renderContent() {
    if (this.loading) {
      return this.renderLoading();
    }
    const modeMethods = this.paymentMethods.filter(method => { var _a; return (method === null || method === void 0 ? void 0 : method.live_mode) === ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode); });
    if (!(modeMethods === null || modeMethods === void 0 ? void 0 : modeMethods.length)) {
      return (h(Fragment, null, h("sc-empty", { icon: "credit-card" }, wp.i18n.__('You have no saved payment methods.', 'surecart')), !!this.backUrl && (h("sc-button", { href: this.backUrl, full: true }, wp.i18n.__('Go Back', 'surecart')))));
    }
    return (h(Fragment, null, h("sc-choices", null, h("div", null, (this.paymentMethods || []).map(method => {
      var _a, _b;
      if ((method === null || method === void 0 ? void 0 : method.live_mode) !== ((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode))
        return null;
      return (h("sc-choice", { checked: ((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.payment_method) === (method === null || method === void 0 ? void 0 : method.id), name: "method", value: method === null || method === void 0 ? void 0 : method.id }, h("sc-payment-method", { paymentMethod: method, full: true })));
    }))), h("sc-button", { type: "primary", full: true, submit: true, loading: this.loading || this.busy, disabled: this.loading || this.busy }, wp.i18n.__('Update', 'surecart')), !!this.backUrl && (h("sc-button", { href: this.backUrl, full: true, loading: this.loading || this.busy, disabled: this.loading || this.busy }, wp.i18n.__('Go Back', 'surecart')))));
  }
  render() {
    return (h("sc-dashboard-module", { heading: wp.i18n.__('Select a payment method', 'surecart'), class: "subscription-payment", error: this.error }, h("sc-form", { onScFormSubmit: e => this.handleSubmit(e) }, h("sc-card", null, this.renderContent())), this.busy && h("sc-block-ui", null)));
  }
};
ScSubscriptionPayment.style = scSubscriptionPaymentCss;

export { ScSubscriptionPayment as sc_subscription_payment };

//# sourceMappingURL=sc-subscription-payment.entry.js.map
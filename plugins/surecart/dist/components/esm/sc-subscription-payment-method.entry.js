import { r as registerInstance, h, a as getElement } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { o as onFirstVisible } from './lazy-64c2bf3b.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';

const scSubscriptionPaymentMethodCss = ":host{display:block}";

const ScSubscriptionPaymentMethod = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.heading = undefined;
    this.subscription = undefined;
    this.paymentMethods = undefined;
    this.error = undefined;
    this.loading = undefined;
    this.busy = undefined;
    this.method = undefined;
  }
  renderLoading() {
    return (h("sc-card", { noPadding: true }, h("sc-stacked-list", null, h("sc-stacked-list-row", { style: { '--columns': '4' }, "mobile-size": 500 }, [...Array(4)].map(() => (h("sc-skeleton", { style: { width: '100px', display: 'inline-block' } })))))));
  }
  renderEmpty() {
    return (h("slot", { name: "empty" }, h("sc-card", null, h("sc-empty", { icon: "credit-card" }, wp.i18n.__('You do not have any payment methods.', 'surecart')))));
  }
  componentWillLoad() {
    onFirstVisible(this.el, () => {
      this.getPaymentMethods();
    });
  }
  /** Get all subscriptions */
  async getPaymentMethods() {
    var _a, _b, _c, _d;
    if ((_a = this.paymentMethods) === null || _a === void 0 ? void 0 : _a.length)
      return;
    const customerId = ((_c = (_b = this.subscription) === null || _b === void 0 ? void 0 : _b.customer) === null || _c === void 0 ? void 0 : _c.id) || ((_d = this.subscription) === null || _d === void 0 ? void 0 : _d.customer);
    if (!customerId)
      return;
    try {
      this.loading = true;
      this.paymentMethods = await this.fetchMethods(customerId);
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.messsage) || wp.i18n.__('Something went wrong', 'surecart');
      console.error(this.error);
    }
    finally {
      this.loading = false;
    }
  }
  async fetchMethods(customerId) {
    var _a;
    return (await apiFetch({
      path: addQueryArgs(`surecart/v1/payment_methods`, {
        expand: ['card', 'customer', 'billing_agreement', 'paypal_account', 'payment_instrument', 'bank_account'],
        customer_ids: [customerId],
        reusable: true,
        live_mode: (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode,
      }),
    }));
  }
  async deleteMethod(method) {
    const r = confirm(wp.i18n.__('Are you sure you want to remove this payment method?', 'surecart'));
    if (!r)
      return;
    try {
      this.busy = true;
      (await apiFetch({
        path: `surecart/v1/payment_methods/${method === null || method === void 0 ? void 0 : method.id}/detach`,
        method: 'PATCH',
      }));
      // remove from view.
      this.paymentMethods = this.paymentMethods.filter(m => m.id !== method.id);
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.messsage) || wp.i18n.__('Something went wrong', 'surecart');
      console.error(this.error);
    }
    finally {
      this.busy = false;
    }
  }
  async updateMethod(e) {
    var _a, _b, _c, _d;
    const { payment_method } = await e.target.getFormJson();
    if (payment_method === (((_b = (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.payment_method) === null || _b === void 0 ? void 0 : _b.id) || ((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.payment_method))) {
      return;
    }
    try {
      this.busy = true;
      this.subscription = (await apiFetch({
        path: `surecart/v1/subscriptions/${(_d = this.subscription) === null || _d === void 0 ? void 0 : _d.id}`,
        method: 'PATCH',
        data: {
          payment_method,
        },
      }));
      // remove from view.
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.messsage) || wp.i18n.__('Something went wrong', 'surecart');
      console.error(this.error);
    }
    finally {
      this.busy = false;
    }
  }
  renderContent() {
    var _a, _b, _c;
    if (this.loading) {
      return this.renderLoading();
    }
    if (!((_a = this.paymentMethods) === null || _a === void 0 ? void 0 : _a.length)) {
      return this.renderEmpty();
    }
    return (h("sc-form", { onScSubmit: e => this.updateMethod(e) }, h("sc-choices", null, this.renderList()), ((_b = this.paymentMethods) === null || _b === void 0 ? void 0 : _b.length) > 1 ? (h("sc-button", { type: "primary", submit: true, full: true, size: "large", busy: this.busy, disabled: this.busy }, wp.i18n.__('Update Payment Method', 'surecart'))) : (h("sc-button", { type: "link", full: true, href: addQueryArgs(window.location.href, {
        action: 'create',
        model: 'payment_method',
        ...(((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.live_mode) === false ? { live_mode: false } : {}),
        success_url: window.location.href,
      }) }, h("sc-icon", { name: "plus", slot: "prefix" }), wp.i18n.__('Add New', 'surecart')))));
  }
  renderList() {
    return this.paymentMethods.map(paymentMethod => {
      var _a, _b, _c;
      const subscription_payment_method_id = ((_b = (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.payment_method) === null || _b === void 0 ? void 0 : _b.id) || ((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.payment_method);
      const { id, card, live_mode, paypal_account } = paymentMethod;
      return (h("sc-choice", { checked: subscription_payment_method_id === id, name: "payment_method", value: id, required: true }, h("sc-flex", { justifyContent: "flex-start", "align-items": "center" }, h("sc-payment-method", { paymentMethod: paymentMethod }), ' ', !live_mode && (h("sc-tag", { type: "warning", size: "small" }, wp.i18n.__('Test', 'surecart')))), h("div", { slot: "description" }, !!(card === null || card === void 0 ? void 0 : card.exp_month) && (h("span", null, 
      /** Translators: Credit Card Expires (Exp. 11/27) */
      wp.i18n.__('Exp.', 'surecart'), card === null || card === void 0 ? void 0 :
        card.exp_month, "/", card === null || card === void 0 ? void 0 :
        card.exp_year)), !!paypal_account && (paypal_account === null || paypal_account === void 0 ? void 0 : paypal_account.email)), subscription_payment_method_id === id && (h("sc-tag", { type: "info", slot: "price" }, wp.i18n.__('Current Payment Method', 'surecart')))));
    });
  }
  render() {
    var _a, _b;
    return (h("sc-dashboard-module", { heading: this.heading || wp.i18n.__('Update Payment Method', 'surecart'), class: "subscription", error: this.error }, ((_a = this.paymentMethods) === null || _a === void 0 ? void 0 : _a.length) > 1 && (h("sc-button", { slot: "end", type: "link", href: addQueryArgs(window.location.href, {
        action: 'create',
        model: 'payment_method',
        ...(((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.live_mode) === false ? { live_mode: false } : {}),
        success_url: window.location.href,
      }) }, h("sc-icon", { name: "plus", slot: "prefix" }), wp.i18n.__('Add New', 'surecart'))), this.renderContent(), this.busy && h("sc-block-ui", { spinner: true })));
  }
  get el() { return getElement(this); }
};
ScSubscriptionPaymentMethod.style = scSubscriptionPaymentMethodCss;

export { ScSubscriptionPaymentMethod as sc_subscription_payment_method };

//# sourceMappingURL=sc-subscription-payment-method.entry.js.map
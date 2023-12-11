'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-d7bdd741.js');
require('./watchers-eeca9c2e.js');
const getters = require('./getters-a4757e13.js');
const google = require('./google-13aecc85.js');
const getters$1 = require('./getters-ac28bd5d.js');
const mutations = require('./mutations-29dac4a7.js');
const fetch = require('./fetch-2dba325c.js');
const ManualPaymentMethods = require('./ManualPaymentMethods-2058a8e2.js');
const mutations$1 = require('./mutations-2fd46f36.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
const inline = require('./inline-a19db3f2.js');
const store = require('./store-68346eb0.js');
const getters$2 = require('./getters-5c083014.js');
const mutations$2 = require('./mutations-957d9aea.js');
require('./index-00f0fc21.js');
require('./util-9c366e9f.js');
require('./utils-45815a15.js');
require('./currency-2733c607.js');
require('./get-query-arg-53bf21e2.js');
require('./index-e302f7c9.js');

const listenTo = (prop, propKey, callback) => google.on('set', (key, newValue, oldValue) => {
  // ignore non-keys
  if (key !== prop)
    return;
  // handle an array, if one has changed, run callback.
  if (Array.isArray(propKey)) {
    if (propKey.some(key => JSON.stringify(newValue === null || newValue === void 0 ? void 0 : newValue[key]) !== JSON.stringify(oldValue === null || oldValue === void 0 ? void 0 : oldValue[key]))) {
      return callback(newValue, oldValue);
    }
  }
  // handle string.
  if (typeof propKey === 'string') {
    if (JSON.stringify(newValue === null || newValue === void 0 ? void 0 : newValue[propKey]) === JSON.stringify(oldValue === null || oldValue === void 0 ? void 0 : oldValue[propKey]))
      return;
    return callback(newValue === null || newValue === void 0 ? void 0 : newValue[propKey], oldValue === null || oldValue === void 0 ? void 0 : oldValue[propKey]);
  }
});

const scCheckoutMolliePaymentCss = ":host{display:block}";

const ScCheckoutMolliePayment = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.processorId = undefined;
    this.method = undefined;
    this.error = undefined;
    this.methods = undefined;
  }
  componentWillLoad() {
    watchers.state.id = 'mollie';
    this.fetchMethods();
    listenTo('checkout', ['total_amount', 'currency', 'reusabled_payment_method_required', 'shipping_address'], () => this.fetchMethods());
  }
  async fetchMethods() {
    var _a;
    const checkout = google.state.checkout;
    if (!(checkout === null || checkout === void 0 ? void 0 : checkout.currency) || !(checkout === null || checkout === void 0 ? void 0 : checkout.total_amount))
      return; // wait until we have a currency.
    try {
      mutations.lockCheckout('methods');
      const response = (await fetch.apiFetch({
        path: addQueryArgs.addQueryArgs(`surecart/v1/processors/${this.processorId}/payment_method_types`, {
          amount: checkout === null || checkout === void 0 ? void 0 : checkout.total_amount,
          country: ((_a = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_address) === null || _a === void 0 ? void 0 : _a.country) || 'us',
          currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency,
          ...((checkout === null || checkout === void 0 ? void 0 : checkout.reusable_payment_method_required) ? { reusable: checkout === null || checkout === void 0 ? void 0 : checkout.reusable_payment_method_required } : {}),
          per_page: 100,
        }),
      }));
      getters.state.methods = (response === null || response === void 0 ? void 0 : response.data) || [];
    }
    catch (e) {
      mutations$1.createErrorNotice(e);
      console.error(e);
    }
    finally {
      mutations.unLockCheckout('methods');
    }
  }
  renderLoading() {
    return (index.h("sc-card", null, index.h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { style: { width: '60%', marginBottom: '0.5em' } })));
  }
  render() {
    var _a, _b, _c;
    if (getters$1.checkoutIsLocked('methods') && !((_a = getters.availableMethodTypes()) === null || _a === void 0 ? void 0 : _a.length)) {
      return this.renderLoading();
    }
    if (!((_b = google.state.checkout) === null || _b === void 0 ? void 0 : _b.currency)) {
      return this.renderLoading();
    }
    if (!((_c = getters.availableMethodTypes()) === null || _c === void 0 ? void 0 : _c.length)) {
      return (index.h("sc-alert", { type: "warning", open: true }, wp.i18n.__('No available payment methods', 'surecart'), ' '));
    }
    const Tag = getters.hasMultipleMethodChoices() ? 'sc-toggles' : 'div';
    return (index.h(index.Fragment, null, index.h(Tag, { collapsible: false, theme: "container" }, (getters.availableMethodTypes() || []).map(method => (index.h("sc-payment-method-choice", { "processor-id": "mollie", "method-id": method === null || method === void 0 ? void 0 : method.id, key: method === null || method === void 0 ? void 0 : method.id }, index.h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, !!(method === null || method === void 0 ? void 0 : method.image) && index.h("img", { src: method === null || method === void 0 ? void 0 : method.image }), index.h("span", null, method === null || method === void 0 ? void 0 : method.description)), index.h("sc-card", null, index.h("sc-payment-selected", { label: wp.i18n.sprintf(wp.i18n.__('%s selected for check out.', 'surecart'), method === null || method === void 0 ? void 0 : method.description) }, !!(method === null || method === void 0 ? void 0 : method.image) && index.h("img", { slot: "icon", src: method === null || method === void 0 ? void 0 : method.image, style: { width: '32px' } }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))))), index.h(ManualPaymentMethods.ManualPaymentMethods, { methods: getters.availableManualPaymentMethods() })), !!getters$1.checkoutIsLocked('methods') && index.h("sc-block-ui", { class: "busy-block-ui", "z-index": 9, style: { '--sc-block-ui-opacity': '0.4' } })));
  }
};
ScCheckoutMolliePayment.style = scCheckoutMolliePaymentCss;

const ScCheckoutPaystackPaymentProvider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    // we need to listen to the form state and pay when the form state enters the paying state.
    this.unlistenToFormState = store.onChange('formState', () => {
      // are we paying?
      if ('paying' === getters$2.currentFormState()) {
        this.confirm();
      }
    });
  }
  disconnectedCallback() {
    this.unlistenToFormState();
  }
  async confirm() {
    var _a, _b, _c, _d;
    // this processor is not selected.
    if ((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) !== 'paystack')
      return;
    // Must be a paystack session
    if (!((_b = (_a = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data.paystack))
      return;
    // Prevent if already paid.
    if (((_c = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _c === void 0 ? void 0 : _c.status) === 'paid')
      return;
    try {
      // must have a public key and access code.
      const { public_key, access_code } = (_d = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _d === void 0 ? void 0 : _d.payment_intent.processor_data.paystack;
      if (!public_key || !access_code) {
        mutations$1.createErrorNotice({ message: wp.i18n.sprintf(wp.i18n.__('Payment gateway configuration incomplete. Please ensure Paystack is properly configured for transactions.', 'surecart')) });
        return;
      }
      const paystack = new inline.se();
      await paystack.newTransaction({
        key: public_key,
        accessCode: access_code,
        onSuccess: async (transaction) => {
          if ((transaction === null || transaction === void 0 ? void 0 : transaction.status) !== 'success') {
            throw { message: wp.i18n.sprintf(wp.i18n.__('Paystack transaction could not be finished. Status: %s', 'surecart'), transaction === null || transaction === void 0 ? void 0 : transaction.status) };
          }
          return mutations$2.updateFormState('PAID');
        },
        onClose: () => mutations$2.updateFormState('REJECT'),
      });
    }
    catch (err) {
      mutations$1.createErrorNotice(err);
      console.error(err);
      mutations$2.updateFormState('REJECT');
    }
  }
};

exports.sc_checkout_mollie_payment = ScCheckoutMolliePayment;
exports.sc_checkout_paystack_payment_provider = ScCheckoutPaystackPaymentProvider;

//# sourceMappingURL=sc-checkout-mollie-payment_2.cjs.entry.js.map
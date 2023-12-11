import { r as registerInstance, h, F as Fragment, H as Host, a as getElement } from './index-644f5478.js';
import { s as state$1 } from './google-db792dd1.js';
import './watchers-cfaf7553.js';
import { s as state, h as hasOtherAvailableCreditCardProcessor, d as hasMultipleProcessorChoices, g as getAvailableProcessor, a as availableProcessors, b as availableManualPaymentMethods } from './getters-d70b464d.js';
import { s as state$2 } from './watchers-f761bdb6.js';
import { M as ManualPaymentMethods } from './ManualPaymentMethods-43200e03.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';
import './currency-4692aeb2.js';
import './index-1046c77e.js';
import './get-query-arg-cb6b8763.js';
import './utils-f20e895e.js';
import './util-60cd51cc.js';

const scPaymentCss = ":host{display:flex !important;flex-direction:column;gap:var(--sc-input-label-margin);position:relative;font-family:var(--sc-font-sans)}.sc-payment-toggle-summary{line-height:1;display:flex;align-items:center;gap:0.5em;font-weight:var(--sc-font-weight-semibold)}.sc-payment-label{display:flex;justify-content:space-between}.sc-payment-instructions{color:var(--sc-color-gray-600);font-size:var(--sc-font-size-small);line-height:var(--sc-line-height-dense)}.sc-payment__stripe-card-element{display:flex !important;flex-direction:column;gap:var(--sc-input-label-margin);position:relative}";

const ScPayment = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.stripePaymentElement = undefined;
    this.disabledProcessorTypes = undefined;
    this.secureNotice = undefined;
    this.label = undefined;
    this.hideTestModeBadge = undefined;
  }
  componentWillLoad() {
    state.disabled.processors = this.disabledProcessorTypes;
  }
  renderStripe(processor) {
    const title = hasOtherAvailableCreditCardProcessor('stripe') ? wp.i18n.__('Credit Card (Stripe)', 'surecart') : wp.i18n.__('Credit Card', 'surecart');
    return (h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "stripe", card: this.stripePaymentElement }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, h("sc-icon", { name: "credit-card", style: { fontSize: '24px' } }), h("span", null, title)), h("div", { class: "sc-payment__stripe-card-element" }, h("slot", { name: "stripe" }))));
  }
  renderPayPal(processor) {
    return (h(Fragment, null, h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "paypal" }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, h("sc-icon", { name: "paypal", style: { width: '80px', fontSize: '24px' } })), h("sc-card", null, h("sc-payment-selected", { label: wp.i18n.__('PayPal selected for check out.', 'surecart') }, h("sc-icon", { slot: "icon", name: "paypal", style: { width: '80px' } }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))), !hasOtherAvailableCreditCardProcessor('paypal') && (h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "paypal", "method-id": "card" }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, h("sc-icon", { name: "credit-card", style: { fontSize: '24px' } }), h("span", null, wp.i18n.__('Credit Card', 'surecart'))), h("sc-card", null, h("sc-payment-selected", { label: wp.i18n.__('Credit Card selected for check out.', 'surecart') }, h("sc-icon", { name: "credit-card", slot: "icon", style: { fontSize: '24px' } }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))))));
  }
  renderPaystack(processor) {
    var _a, _b;
    const title = hasOtherAvailableCreditCardProcessor('paystack') ? wp.i18n.__('Credit Card (Paystack)', 'surecart') : wp.i18n.__('Credit Card', 'surecart');
    // if system currency is not in the supported currency list, then stop.
    if (!((_a = processor === null || processor === void 0 ? void 0 : processor.supported_currencies) !== null && _a !== void 0 ? _a : []).includes((_b = window === null || window === void 0 ? void 0 : window.scData) === null || _b === void 0 ? void 0 : _b.currency)) {
      return;
    }
    return (h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "paystack" }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, h("sc-icon", { name: "credit-card", style: { fontSize: '24px' } }), h("span", null, title)), h("sc-card", null, h("sc-payment-selected", { label: wp.i18n.__('Credit Card selected for check out.', 'surecart') }, h("sc-icon", { slot: "icon", name: "credit-card" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart'))), h("sc-checkout-paystack-payment-provider", null)));
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    // payment is not required for this order.
    if (((_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required) === false) {
      return null;
    }
    const Tag = hasMultipleProcessorChoices() || (state$2 === null || state$2 === void 0 ? void 0 : state$2.id) === 'paypal' ? 'sc-toggles' : 'div';
    const mollie = getAvailableProcessor('mollie');
    return (h(Host, null, h("sc-form-control", { label: this.label, exportparts: "label, help-text, form-control" }, h("div", { class: "sc-payment-label", slot: "label" }, h("div", null, this.label), state$1.mode === 'test' && !this.hideTestModeBadge && (h("sc-tag", { type: "warning", size: "small", exportparts: "base:test-badge__base, content:test-badge__content" }, wp.i18n.__('Test Mode', 'surecart')))), (mollie === null || mollie === void 0 ? void 0 : mollie.id) ? (h("sc-checkout-mollie-payment", { "processor-id": mollie === null || mollie === void 0 ? void 0 : mollie.id })) : (h(Tag, { collapsible: false, theme: "container" }, !((_b = availableProcessors()) === null || _b === void 0 ? void 0 : _b.length) && !((_c = availableManualPaymentMethods()) === null || _c === void 0 ? void 0 : _c.length) && (h("sc-alert", { type: "info", open: true }, ((_e = (_d = window === null || window === void 0 ? void 0 : window.scData) === null || _d === void 0 ? void 0 : _d.user_permissions) === null || _e === void 0 ? void 0 : _e.manage_sc_shop_settings) ? (h(Fragment, null, wp.i18n.__('You do not have any processors enabled for this mode and cart. ', 'surecart'), h("a", { href: addQueryArgs(`${(_f = window === null || window === void 0 ? void 0 : window.scData) === null || _f === void 0 ? void 0 : _f.admin_url}admin.php`, {
        page: 'sc-settings',
        tab: 'processors',
      }), style: { color: 'var(--sc-color-gray-700)' } }, wp.i18n.__('Please configure your processors', 'surecart')), ".")) : (wp.i18n.__('Please contact us for payment.', 'surecart')))), (availableProcessors() || []).map(processor => {
      switch (processor === null || processor === void 0 ? void 0 : processor.processor_type) {
        case 'stripe':
          return this.renderStripe(processor);
        case 'paypal':
          return this.renderPayPal(processor);
        case 'paystack':
          return this.renderPaystack(processor);
      }
    }), h(ManualPaymentMethods, { methods: availableManualPaymentMethods() }))))));
  }
  get el() { return getElement(this); }
};
ScPayment.style = scPaymentCss;

export { ScPayment as sc_payment };

//# sourceMappingURL=sc-payment.entry.js.map
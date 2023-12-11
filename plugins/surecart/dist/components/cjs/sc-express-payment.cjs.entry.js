'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const consumer = require('./consumer-21fdeb72.js');

const scExpressPaymentCss = ":host{display:block}";

const ScExpressPayment = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.processor = undefined;
    this.formId = undefined;
    this.busy = undefined;
    this.order = undefined;
    this.dividerText = undefined;
    this.debug = undefined;
    this.hasPaymentOptions = undefined;
  }
  onPaymentRequestLoaded() {
    this.hasPaymentOptions = true;
  }
  renderStripePaymentRequest() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (!((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.order) === null || _a === void 0 ? void 0 : _a.processor_data) === null || _b === void 0 ? void 0 : _b.stripe) === null || _c === void 0 ? void 0 : _c.publishable_key) || !((_f = (_e = (_d = this === null || this === void 0 ? void 0 : this.order) === null || _d === void 0 ? void 0 : _d.processor_data) === null || _e === void 0 ? void 0 : _e.stripe) === null || _f === void 0 ? void 0 : _f.account_id)) {
      return '';
    }
    return (index.h("sc-stripe-payment-request", { formId: this.formId, debug: this.debug, order: this.order, stripeAccountId: (_j = (_h = (_g = this === null || this === void 0 ? void 0 : this.order) === null || _g === void 0 ? void 0 : _g.processor_data) === null || _h === void 0 ? void 0 : _h.stripe) === null || _j === void 0 ? void 0 : _j.account_id, publishableKey: (_m = (_l = (_k = this === null || this === void 0 ? void 0 : this.order) === null || _k === void 0 ? void 0 : _k.processor_data) === null || _l === void 0 ? void 0 : _l.stripe) === null || _m === void 0 ? void 0 : _m.publishable_key }));
  }
  render() {
    return (index.h(index.Host, { class: { 'is-empty': !this.hasPaymentOptions && !this.debug } }, this.renderStripePaymentRequest(), (this.hasPaymentOptions || this.debug) && index.h("sc-divider", { style: { '--spacing': 'calc(var(--sc-form-row-spacing)/2)' } }, this.dividerText), this.busy && index.h("sc-block-ui", null)));
  }
};
consumer.openWormhole(ScExpressPayment, ['order', 'formId', 'busy'], false);
ScExpressPayment.style = scExpressPaymentCss;

exports.sc_express_payment = ScExpressPayment;

//# sourceMappingURL=sc-express-payment.cjs.entry.js.map
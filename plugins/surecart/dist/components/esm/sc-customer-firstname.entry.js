import { r as registerInstance, c as createEvent, h } from './index-644f5478.js';
import { a as getValueFromUrl } from './util-60cd51cc.js';
import { s as state$1 } from './store-222fb2c1.js';
import { s as state, o as onChange } from './google-db792dd1.js';
import { c as createOrUpdateCheckout } from './index-d873f782.js';
import './index-1046c77e.js';
import './utils-f20e895e.js';
import './currency-4692aeb2.js';
import './add-query-args-f4c5962b.js';
import './get-query-arg-cb6b8763.js';
import './watchers-cfaf7553.js';
import './watchers-f761bdb6.js';
import './getters-d70b464d.js';
import './fetch-2525e763.js';

const scCustomerFirstnameCss = ":host{display:block}";

const ScCustomerFirstname = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scChange = createEvent(this, "scChange", 7);
    this.scUpdateOrderState = createEvent(this, "scUpdateOrderState", 7);
    this.scClear = createEvent(this, "scClear", 7);
    this.scInput = createEvent(this, "scInput", 7);
    this.scFocus = createEvent(this, "scFocus", 7);
    this.scBlur = createEvent(this, "scBlur", 7);
    this.scUpdateCustomer = createEvent(this, "scUpdateCustomer", 7);
    this.loggedIn = undefined;
    this.size = 'medium';
    this.value = getValueFromUrl('first_name');
    this.pill = false;
    this.label = undefined;
    this.showLabel = true;
    this.help = '';
    this.placeholder = undefined;
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.invalid = false;
    this.autofocus = undefined;
    this.hasFocus = undefined;
  }
  async reportValidity() {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!this.required) {
      return await ((_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.reportValidity) === null || _b === void 0 ? void 0 : _b.call(_a));
    }
    (_d = (_c = this.input) === null || _c === void 0 ? void 0 : _c.setCustomValidity) === null || _d === void 0 ? void 0 : _d.call(_c, '');
    if (!((_e = this.input) === null || _e === void 0 ? void 0 : _e.value.trim().length)) {
      this.input.setCustomValidity(wp.i18n.__('Field must not be empty.', 'surecart'));
    }
    const valid = await ((_g = (_f = this.input) === null || _f === void 0 ? void 0 : _f.reportValidity) === null || _g === void 0 ? void 0 : _g.call(_f));
    if (!valid) {
      return false;
    }
    return valid;
  }
  /** Silently update the checkout when the input changes. */
  async handleChange() {
    this.value = this.input.value;
    try {
      state.checkout = (await createOrUpdateCheckout({ id: state.checkout.id, data: { first_name: this.input.value } }));
    }
    catch (error) {
      console.error(error);
    }
  }
  /** Sync customer first name with session if it's updated by other means */
  handleSessionChange() {
    var _a, _b, _c, _d, _e, _f;
    //return if we already have a value
    if (this.value)
      return;
    const fromUrl = getValueFromUrl('first_name');
    if (!state$1.loggedIn && !!fromUrl) {
      this.value = fromUrl;
      return;
    }
    if (!state$1.loggedIn) {
      this.value = ((_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.first_name) || ((_c = state === null || state === void 0 ? void 0 : state.checkout) === null || _c === void 0 ? void 0 : _c.first_name);
    }
    else {
      this.value = ((_d = state === null || state === void 0 ? void 0 : state.checkout) === null || _d === void 0 ? void 0 : _d.first_name) || ((_f = (_e = state === null || state === void 0 ? void 0 : state.checkout) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.first_name);
    }
  }
  /** Listen to checkout. */
  componentWillLoad() {
    this.handleSessionChange();
    this.removeCheckoutListener = onChange('checkout', () => this.handleSessionChange());
  }
  /** Remove listener. */
  disconnectedCallback() {
    this.removeCheckoutListener();
  }
  render() {
    return (h("sc-input", { type: "text", name: "first_name", ref: el => (this.input = el), value: this.value, label: this.label, help: this.help, autocomplete: "first_name", placeholder: this.placeholder, readonly: this.readonly, required: this.required, invalid: this.invalid, autofocus: this.autofocus, hasFocus: this.hasFocus, onScChange: () => this.handleChange(), onScInput: () => this.scInput.emit(), onScFocus: () => this.scFocus.emit(), onScBlur: () => this.scBlur.emit() }));
  }
};
ScCustomerFirstname.style = scCustomerFirstnameCss;

export { ScCustomerFirstname as sc_customer_firstname };

//# sourceMappingURL=sc-customer-firstname.entry.js.map
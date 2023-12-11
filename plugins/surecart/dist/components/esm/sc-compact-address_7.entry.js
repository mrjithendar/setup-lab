import { r as registerInstance, c as createEvent, h, a as getElement, H as Host, F as Fragment } from './index-644f5478.js';
import { c as countryChoices, h as hasState } from './address-30ec68e0.js';
import { r as reportChildrenValidity } from './form-data-dd63c61f.js';
import { s as state } from './store-b85bbb50.js';
import { s as state$1 } from './google-db792dd1.js';
import { o as openWormhole } from './consumer-32cc6385.js';
import { a as isBumpInOrder } from './index-74024349.js';
import { i as intervalString } from './price-3e976a49.js';
import { s as sizeImage } from './media-4060870c.js';
import { l as lockCheckout, u as unLockCheckout } from './mutations-aff3c7ce.js';
import { c as createOrUpdateCheckout } from './index-d873f782.js';
import { f as formBusy } from './getters-26bb263b.js';
import { c as createErrorNotice } from './mutations-abf45d08.js';
import { u as updateFormState } from './mutations-34f0f38c.js';
import './index-1046c77e.js';
import './utils-f20e895e.js';
import './currency-4692aeb2.js';
import './add-query-args-f4c5962b.js';
import './get-query-arg-cb6b8763.js';
import './watchers-cfaf7553.js';
import './watchers-f761bdb6.js';
import './getters-d70b464d.js';
import './util-60cd51cc.js';
import './fetch-2525e763.js';

const scCompactAddressCss = ":host{display:block}.sc-address{display:block;position:relative}.sc-address [hidden]{display:none}.sc-address--loading{min-height:70px}.sc-address--loading sc-skeleton{display:block;margin-bottom:1em}.sc-address__control{display:block}.sc-address__control>*{margin-bottom:-1px}.sc-address__columns{display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;justify-content:space-between}.sc-address__columns>*{flex:1;width:50%;margin-left:-1px}.sc-address__columns>*:first-child{margin-left:0}";

const ScCompactAddress = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scChangeAddress = createEvent(this, "scChangeAddress", 7);
    this.scInputAddress = createEvent(this, "scInputAddress", 7);
    this.address = {
      country: null,
      city: null,
      line_1: null,
      line_2: null,
      postal_code: null,
      state: null,
    };
    this.names = {
      country: 'shipping_country',
      city: 'shipping_city',
      line_1: 'shipping_line_1',
      line_2: 'shipping_line_2',
      postal_code: 'shipping_postal_code',
      state: 'shipping_state',
    };
    this.placeholders = {
      country: '',
      postal_code: '',
      state: '',
    };
    this.label = wp.i18n.__('Country or region', 'surecart');
    this.required = undefined;
    this.loading = undefined;
    this.countryChoices = countryChoices;
    this.regions = undefined;
    this.showState = undefined;
    this.showPostal = undefined;
  }
  /** When the state changes, we want to update city and postal fields. */
  handleAddressChange() {
    if (!this.address.country)
      return;
    this.setRegions();
    this.showState = ['US', 'CA'].includes(this.address.country);
    this.showPostal = ['US'].includes(this.address.country);
    this.scChangeAddress.emit(this.address);
    this.scInputAddress.emit(this.address);
  }
  updateAddress(address) {
    this.address = { ...this.address, ...address };
  }
  handleAddressInput(address) {
    this.scInputAddress.emit({ ...this.address, ...address });
  }
  clearAddress() {
    var _a;
    this.address = {
      name: (_a = this.address) === null || _a === void 0 ? void 0 : _a.name,
      country: null,
      line_1: null,
      line_2: null,
      city: null,
      postal_code: null,
      state: null,
    };
  }
  /** Set the regions based on the country. */
  setRegions() {
    if (hasState(this.address.country)) {
      import('./countries-dfee7456.js').then(module => {
        this.regions = module === null || module === void 0 ? void 0 : module[this.address.country];
      });
    }
    else {
      this.regions = [];
    }
  }
  componentWillLoad() {
    var _a;
    this.handleAddressChange();
    const country = (_a = this.countryChoices.find(country => country.value === this.address.country)) === null || _a === void 0 ? void 0 : _a.value;
    if (country) {
      this.updateAddress({ country });
    }
  }
  async reportValidity() {
    return reportChildrenValidity(this.el);
  }
  getStatePlaceholder() {
    var _a, _b;
    if ((_a = this.placeholders) === null || _a === void 0 ? void 0 : _a.state)
      return this.placeholders.state;
    if (((_b = this.address) === null || _b === void 0 ? void 0 : _b.country) === 'US')
      return wp.i18n.__('State', 'surecart');
    return wp.i18n.__('Province/Region', 'surecart');
  }
  render() {
    var _a, _b, _c, _d, _e;
    return (h("div", { class: "sc-address", part: "base" }, h("sc-form-control", { exportparts: "label, help-text, form-control", label: this.label, class: "sc-address__control", part: "control", required: this.required }, h("sc-select", { exportparts: "base:select__base, input, form-control, label, help-text, trigger, panel, caret, search__base, search__input, search__form-control, menu__base, spinner__base, empty", value: (_a = this.address) === null || _a === void 0 ? void 0 : _a.country, onScChange: (e) => {
        this.clearAddress();
        this.updateAddress({ country: e.target.value || null });
      }, choices: this.countryChoices, autocomplete: 'country-name', placeholder: ((_b = this.placeholders) === null || _b === void 0 ? void 0 : _b.country) || wp.i18n.__('Select Your Country', 'surecart'), name: this.names.country, search: true, unselect: false, "squared-bottom": this.showState || this.showPostal, required: this.required }), h("div", { class: "sc-address__columns" }, this.showState && (h("sc-select", { exportparts: "base:select__base, input, form-control, label, help-text, trigger, panel, caret, search__base, search__input, search__form-control, menu__base, spinner__base, empty", placeholder: this.getStatePlaceholder(), name: this.names.state, autocomplete: 'address-level1', value: (_c = this === null || this === void 0 ? void 0 : this.address) === null || _c === void 0 ? void 0 : _c.state, onScChange: (e) => this.updateAddress({ state: e.target.value || null }), choices: this.regions, required: this.required, search: true, "squared-top": true, unselect: false, "squared-right": this.showPostal })), this.showPostal && (h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", placeholder: ((_d = this.placeholders) === null || _d === void 0 ? void 0 : _d.postal_code) || wp.i18n.__('Postal Code/Zip', 'surecart'), name: this.names.postal_code, onScChange: (e) => this.updateAddress({ postal_code: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ name: e.target.value || null }), autocomplete: 'postal-code', required: this.required, value: (_e = this === null || this === void 0 ? void 0 : this.address) === null || _e === void 0 ? void 0 : _e.postal_code, "squared-top": true, maxlength: 5, "squared-left": this.showState })))), this.loading && h("sc-block-ui", { exportparts: "base:block-ui, content:block-ui__content" })));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "address": ["handleAddressChange"]
  }; }
};
ScCompactAddress.style = scCompactAddressCss;

const scLineItemShippingCss = ":host{display:block}";

const ScLineItemShipping = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = undefined;
  }
  render() {
    const { checkout } = state$1;
    // don't show if no shipping amount if no choice selected
    if (!(checkout === null || checkout === void 0 ? void 0 : checkout.selected_shipping_choice)) {
      return h(Host, { style: { display: 'none' } });
    }
    if (state.formState.value === 'loading') {
      return (h("sc-line-item", null, h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), h("sc-skeleton", { slot: "price", style: { 'width': '70px', 'display': 'inline-block', '--border-radius': '6px' } })));
    }
    return (h("sc-line-item", null, h("span", { slot: "description" }, this.label || wp.i18n.__('Shipping', 'surecart')), h("span", { slot: "price" }, (checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount) ? (h("sc-format-number", { type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount })) : (wp.i18n.__('Free', 'surecart')))));
  }
};
ScLineItemShipping.style = scLineItemShippingCss;

const scLineItemTaxCss = ":host{display:block}";

const ScLineItemTax = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.order = undefined;
    this.loading = undefined;
  }
  renderLabel() {
    var _a, _b, _c;
    let label = wp.i18n.sprintf(wp.i18n.__('Estimated %s', 'surecart'), ((_a = this === null || this === void 0 ? void 0 : this.order) === null || _a === void 0 ? void 0 : _a.tax_label) || '');
    if (((_b = this === null || this === void 0 ? void 0 : this.order) === null || _b === void 0 ? void 0 : _b.tax_status) === 'calculated') {
      label = ((_c = this.order) === null || _c === void 0 ? void 0 : _c.tax_label) || '';
    }
    return (h(Fragment, null, `${wp.i18n.__('Tax:', 'surecart')} ${label}`, this.renderPercent()));
  }
  renderPercent() {
    var _a;
    if ((_a = this.order) === null || _a === void 0 ? void 0 : _a.tax_percent) {
      return (h(Fragment, null, '(', this.order.tax_percent, "%", ')'));
    }
    return '';
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    // hide if tax is 0
    if (!((_a = this === null || this === void 0 ? void 0 : this.order) === null || _a === void 0 ? void 0 : _a.tax_amount)) {
      return null;
    }
    return (h("sc-line-item", null, h("span", { slot: "description" }, this.renderLabel()), ((_b = this.order) === null || _b === void 0 ? void 0 : _b.tax_exclusive_amount) && (h("span", { slot: "price" }, h("sc-format-number", { type: "currency", currency: ((_c = this === null || this === void 0 ? void 0 : this.order) === null || _c === void 0 ? void 0 : _c.currency) || 'usd', value: (_d = this === null || this === void 0 ? void 0 : this.order) === null || _d === void 0 ? void 0 : _d.tax_exclusive_amount }))), ((_e = this.order) === null || _e === void 0 ? void 0 : _e.tax_inclusive_amount) && (h("span", { slot: "price-description" }, '(', h("sc-format-number", { type: "currency", currency: ((_f = this === null || this === void 0 ? void 0 : this.order) === null || _f === void 0 ? void 0 : _f.currency) || 'usd', value: (_g = this === null || this === void 0 ? void 0 : this.order) === null || _g === void 0 ? void 0 : _g.tax_inclusive_amount }), " ", wp.i18n.__('included', 'surecart'), ')'))));
  }
};
openWormhole(ScLineItemTax, ['order', 'loading'], false);
ScLineItemTax.style = scLineItemTaxCss;

const scOrderBumpCss = ":host {\n  display: block;\n}\n\n.bump {\n  display: grid;\n  gap: 1em;\n}\n.bump__text {\n  display: grid;\n  gap: 0.25em;\n}\n.bump__tag {\n  background: var(--sc-color-primary-500);\n  color: var(--sc-color-white);\n  border-radius: var(--sc-input-border-radius-medium);\n  padding: var(--sc-spacing-x-small);\n  font-size: var(--sc-font-size-x-small);\n}\n.bump__product {\n  display: flex;\n  align-items: center;\n  gap: var(--sc-choice-padding, 1.3em 1.1em);\n  line-height: var(--sc-line-height-dense);\n}\n.bump__product--wrapper {\n  container-type: inline-size;\n}\n@container (max-width: 325px) {\n  .bump__product {\n    flex-direction: column;\n    align-items: start;\n  }\n}\n.bump__product-title {\n  font-weight: var(--sc-font-weight-semibold);\n}\n.bump__product-description {\n  color: var(--sc-input-label-color);\n}\n.bump__image {\n  width: var(--sc-product-line-item-image-size, 4em);\n  height: var(--sc-product-line-item-image-size, 4em);\n  flex: 0 0 var(--sc-product-line-item-image-size, 4em);\n  object-fit: cover;\n  border-radius: 4px;\n  border: 1px solid var(--sc-color-gray-200);\n  display: block;\n  box-shadow: var(--sc-input-box-shadow);\n}\n.bump__price--has-discount .bump__original-price {\n  text-decoration: line-through;\n  color: var(--sc-color-gray-500);\n  font-size: var(--sc-font-size-small);\n}\n.bump__price .bump__new-price {\n  font-size: var(--sc-font-size-large);\n  color: var(--sc-color-gray-700);\n}\n.bump__price .bump__interval {\n  color: var(--sc-color-gray-500);\n}\n.bump__amount {\n  display: flex;\n  align-items: center;\n  gap: var(--sc-spacing-x-small);\n  flex-wrap: wrap;\n  margin-top: var(--sc-spacing-xx-small);\n}";

const ScOrderBump = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scAddLineItem = createEvent(this, "scAddLineItem", 7);
    this.scRemoveLineItem = createEvent(this, "scRemoveLineItem", 7);
    var _a;
    this.bump = undefined;
    this.showControl = undefined;
    this.cdnRoot = (_a = window.scData) === null || _a === void 0 ? void 0 : _a.cdn_root;
  }
  /** Update the line item. */
  updateLineItem(add) {
    var _a, _b, _c;
    const price_id = ((_a = this.bump.price) === null || _a === void 0 ? void 0 : _a.id) || ((_b = this.bump) === null || _b === void 0 ? void 0 : _b.price);
    if (add) {
      this.scAddLineItem.emit({
        bump: (_c = this.bump) === null || _c === void 0 ? void 0 : _c.id,
        price_id,
        quantity: 1,
      });
    }
    else {
      this.scRemoveLineItem.emit({
        price_id,
        quantity: 1,
      });
    }
  }
  newPrice() {
    var _a, _b, _c, _d, _e, _f;
    let amount = null;
    let initialAmount = ((_b = (_a = this.bump) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.amount) || 0;
    if ((_c = this.bump) === null || _c === void 0 ? void 0 : _c.amount_off) {
      amount = Math.max(0, initialAmount - ((_d = this.bump) === null || _d === void 0 ? void 0 : _d.amount_off));
    }
    if ((_e = this.bump) === null || _e === void 0 ? void 0 : _e.percent_off) {
      const off = initialAmount * (((_f = this.bump) === null || _f === void 0 ? void 0 : _f.percent_off) / 100);
      amount = Math.max(0, initialAmount - off);
    }
    return amount;
  }
  renderInterval() {
    var _a;
    const interval = intervalString((_a = this.bump) === null || _a === void 0 ? void 0 : _a.price, { labels: { interval: '/', period: wp.i18n.__('for', 'surecart') } });
    if (!interval.trim().length)
      return null;
    return h("span", { class: "bump__interval" }, interval);
  }
  renderPrice() {
    var _a, _b, _c, _d, _e, _f, _g;
    return (h("div", { slot: "description", class: { 'bump__price': true, 'bump__price--has-discount': !!((_a = this.bump) === null || _a === void 0 ? void 0 : _a.percent_off) || !!((_b = this.bump) === null || _b === void 0 ? void 0 : _b.amount_off) }, part: "price" }, h("sc-format-number", { type: "currency", class: "bump__original-price", value: (_d = (_c = this.bump) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.amount, currency: (_f = (_e = this.bump) === null || _e === void 0 ? void 0 : _e.price) === null || _f === void 0 ? void 0 : _f.currency }), ' ', this.newPrice() === 0 && wp.i18n.__('Free', 'surecart'), this.newPrice() !== null && this.newPrice() > 0 && (h("sc-format-number", { type: "currency", class: "bump__new-price", value: this.newPrice(), currency: ((_g = this.bump) === null || _g === void 0 ? void 0 : _g.price).currency })), this.renderInterval()));
  }
  renderDiscount() {
    var _a, _b, _c, _d, _e;
    if (!!((_a = this.bump) === null || _a === void 0 ? void 0 : _a.amount_off)) {
      return (h("div", { class: "bump__tag" }, wp.i18n.__('Save', 'surecart'), " ", h("sc-format-number", { type: "currency", value: -((_b = this.bump) === null || _b === void 0 ? void 0 : _b.amount_off), currency: ((_c = this.bump) === null || _c === void 0 ? void 0 : _c.price).currency })));
    }
    if (!!((_d = this.bump) === null || _d === void 0 ? void 0 : _d.percent_off)) {
      return h("div", { class: "bump__tag" }, wp.i18n.sprintf(wp.i18n.__('Save %s%%', 'surecart'), (_e = this.bump) === null || _e === void 0 ? void 0 : _e.percent_off));
    }
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const product = (_b = (_a = this.bump) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.product;
    return (h("sc-choice", { value: (_c = this.bump) === null || _c === void 0 ? void 0 : _c.id, type: "checkbox", showControl: this.showControl, checked: isBumpInOrder(this.bump, state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout), onScChange: e => this.updateLineItem(e.target.checked), exportparts: "base, control, checked-icon, title" }, h("div", { part: "base-content", class: "bump" }, h("div", { class: "bump__text" }, h("div", { class: "bump__title" }, ((_e = (_d = this.bump) === null || _d === void 0 ? void 0 : _d.metadata) === null || _e === void 0 ? void 0 : _e.cta) || ((_f = this.bump) === null || _f === void 0 ? void 0 : _f.name) || (product === null || product === void 0 ? void 0 : product.name)), h("div", { class: "bump__amount" }, this.renderPrice(), " ", this.renderDiscount()))), ((_h = (_g = this.bump) === null || _g === void 0 ? void 0 : _g.metadata) === null || _h === void 0 ? void 0 : _h.description) && (h("div", { slot: "footer", class: "bump__product--wrapper" }, h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-medium)' } }), h("div", { class: "bump__product" }, !!(product === null || product === void 0 ? void 0 : product.image_url) && h("img", { src: sizeImage(product === null || product === void 0 ? void 0 : product.image_url, 130), class: "bump__image" }), h("div", { class: "bump__product-text" }, !!((_k = (_j = this.bump) === null || _j === void 0 ? void 0 : _j.metadata) === null || _k === void 0 ? void 0 : _k.cta) && h("div", { class: "bump__product-title" }, this.bump.name || (product === null || product === void 0 ? void 0 : product.name)), !!((_m = (_l = this.bump) === null || _l === void 0 ? void 0 : _l.metadata) === null || _m === void 0 ? void 0 : _m.description) && h("div", { class: "bump__product-description" }, (_p = (_o = this.bump) === null || _o === void 0 ? void 0 : _o.metadata) === null || _p === void 0 ? void 0 : _p.description)))))));
  }
};
ScOrderBump.style = scOrderBumpCss;

const scOrderBumpsCss = ":host{display:block}.bumps__list{display:grid;gap:10px}";

const ScOrderBumps = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = undefined;
    this.showControl = undefined;
    this.help = undefined;
  }
  render() {
    var _a, _b, _c, _d, _e;
    if (!((_c = (_b = (_a = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _a === void 0 ? void 0 : _a.recommended_bumps) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length)) {
      return null;
    }
    return (h("sc-form-control", { label: this.label || wp.i18n.__('Recommended', 'surecart'), help: this.help }, h("div", { class: "bumps__list" }, (((_e = (_d = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _d === void 0 ? void 0 : _d.recommended_bumps) === null || _e === void 0 ? void 0 : _e.data) || [])
      .filter(bump => { var _a, _b, _c, _d; return ((_d = (_c = (_b = (_a = bump === null || bump === void 0 ? void 0 : bump.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.variants) === null || _c === void 0 ? void 0 : _c.pagination) === null || _d === void 0 ? void 0 : _d.count) === 0; }) // exclude variants for now.
      .map(bump => (h("sc-order-bump", { key: bump === null || bump === void 0 ? void 0 : bump.id, showControl: this.showControl, bump: bump }))))));
  }
};
ScOrderBumps.style = scOrderBumpsCss;

const scOrderShippingAddressCss = ":host{display:block}.sc-order-shipping__loading{display:flex;flex-direction:column;gap:0.5em}";

const ScOrderShippingAddress = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scUpdateOrder = createEvent(this, "scUpdateOrder", 7);
    this.label = undefined;
    this.required = false;
    this.loading = undefined;
    this.shippingAddress = undefined;
    this.taxStatus = undefined;
    this.taxEnabled = undefined;
    this.shippingEnabled = undefined;
    this.full = undefined;
    this.showName = undefined;
    this.namePlaceholder = wp.i18n.__('Name or Company Name', 'surecart');
    this.countryPlaceholder = wp.i18n.__('Country', 'surecart');
    this.cityPlaceholder = wp.i18n.__('City', 'surecart');
    this.line1Placeholder = wp.i18n.__('Address', 'surecart');
    this.line2Placeholder = wp.i18n.__('Address Line 2', 'surecart');
    this.postalCodePlaceholder = wp.i18n.__('Postal Code/Zip', 'surecart');
    this.statePlaceholder = wp.i18n.__('State/Province/Region', 'surecart');
    this.defaultCountry = undefined;
    this.requireName = false;
    this.placeholders = {
      name: wp.i18n.__('Name or Company Name', 'surecart'),
      country: wp.i18n.__('Country', 'surecart'),
      city: wp.i18n.__('City', 'surecart'),
      line_1: wp.i18n.__('Address', 'surecart'),
      line_2: wp.i18n.__('Address Line 2', 'surecart'),
      postal_code: wp.i18n.__('Postal Code/Zip', 'surecart'),
      state: wp.i18n.__('State/Province/Region', 'surecart'),
    };
    this.address = {
      country: null,
      city: null,
      line_1: null,
      line_2: null,
      postal_code: null,
      state: null,
    };
  }
  /** When the shipping address changes, we want to use that instead of what's entered, if we have empty fields. */
  handleCustomerAddressChange(val, old) {
    if ((val === null || val === void 0 ? void 0 : val.id) && !old) {
      this.address = { ...this.address, ...val };
    }
  }
  async updateAddressState(address) {
    if (JSON.stringify(address) === JSON.stringify(this.address))
      return; // no change, don't update.
    this.address = address;
    try {
      lockCheckout('shipping-address');
      state$1.checkout = (await createOrUpdateCheckout({
        id: state$1.checkout.id,
        data: {
          shipping_address: this.address,
        },
      }));
    }
    catch (e) {
      console.error(e);
    }
    finally {
      unLockCheckout('shipping-address');
    }
  }
  async reportValidity() {
    var _a, _b;
    return (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.reportValidity) === null || _b === void 0 ? void 0 : _b.call(_a);
  }
  componentWillLoad() {
    if (this.defaultCountry && !this.address.country) {
      this.address.country = this.defaultCountry;
    }
    this.handleRequirementChange();
    this.handleNameChange();
  }
  handleRequirementChange() {
    if (this.shippingEnabled || this.taxEnabled) {
      this.required = true;
    }
  }
  handleNameChange() {
    if (this.requireName || this.showName) {
      this.full = true;
    }
  }
  render() {
    if (this.shippingEnabled || this.full) {
      return (h("sc-address", { exportparts: "label, help-text, form-control, input__base, select__base, columns, search__base, menu__base", ref: el => (this.input = el), label: this.label || wp.i18n.__('Shipping Address', 'surecart'), placeholders: {
          name: this.namePlaceholder,
          country: this.countryPlaceholder,
          city: this.cityPlaceholder,
          line_1: this.line1Placeholder,
          line_2: this.line2Placeholder,
          postal_code: this.postalCodePlaceholder,
          state: this.statePlaceholder,
        }, required: this.required, loading: this.loading, address: this.address, "show-name": this.showName, "require-name": this.requireName, onScChangeAddress: e => this.updateAddressState(e.detail) }));
    }
    return (h("sc-compact-address", { ref: el => (this.input = el), required: this.required, loading: this.loading, address: this.address, placeholders: {
        name: this.namePlaceholder,
        country: this.countryPlaceholder,
        city: this.cityPlaceholder,
        line_1: this.line1Placeholder,
        line_2: this.line2Placeholder,
        postal_code: this.postalCodePlaceholder,
        state: this.statePlaceholder,
      }, label: this.label, onScChangeAddress: e => this.updateAddressState(e.detail) }));
  }
  static get watchers() { return {
    "shippingAddress": ["handleCustomerAddressChange"],
    "shippingEnabled": ["handleRequirementChange"],
    "taxEnabled": ["handleRequirementChange"],
    "requireName": ["handleNameChange"],
    "showName": ["handleNameChange"]
  }; }
};
openWormhole(ScOrderShippingAddress, ['shippingAddress', 'loading', 'taxStatus', 'taxEnabled', 'shippingEnabled'], false);
ScOrderShippingAddress.style = scOrderShippingAddressCss;

const scOrderTaxIdInputCss = ":host{display:block}";

const ScOrderTaxIdInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.show = false;
    this.otherLabel = undefined;
    this.caGstLabel = undefined;
    this.auAbnLabel = undefined;
    this.gbVatLabel = undefined;
    this.euVatLabel = undefined;
  }
  async reportValidity() {
    return this.input.reportValidity();
  }
  getStatus() {
    var _a, _b, _c, _d, _e;
    if (((_b = (_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.tax_identifier) === null || _b === void 0 ? void 0 : _b.number_type) !== 'eu_vat') {
      return 'unknown';
    }
    if (((_c = state$1.taxProtocol) === null || _c === void 0 ? void 0 : _c.eu_vat_unverified_behavior) === 'apply_reverse_charge') {
      return 'unknown';
    }
    return ((_e = (_d = state$1.checkout) === null || _d === void 0 ? void 0 : _d.tax_identifier) === null || _e === void 0 ? void 0 : _e.eu_vat_verified) ? 'valid' : 'invalid';
  }
  async updateOrder(tax_identifier) {
    try {
      updateFormState('FETCH');
      state$1.checkout = (await createOrUpdateCheckout({
        id: state$1.checkout.id,
        data: { tax_identifier },
      }));
      updateFormState('RESOLVE');
    }
    catch (e) {
      console.error(e);
      createErrorNotice(e);
      updateFormState('REJECT');
    }
  }
  required() {
    var _a, _b, _c;
    return ((_a = state$1.taxProtocol) === null || _a === void 0 ? void 0 : _a.eu_vat_required) && ((_c = (_b = state$1.checkout) === null || _b === void 0 ? void 0 : _b.tax_identifier) === null || _c === void 0 ? void 0 : _c.number_type) === 'eu_vat';
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    return (h("sc-tax-id-input", { ref: el => (this.input = el), show: this.show, number: (_b = (_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.tax_identifier) === null || _b === void 0 ? void 0 : _b.number, type: (_d = (_c = state$1.checkout) === null || _c === void 0 ? void 0 : _c.tax_identifier) === null || _d === void 0 ? void 0 : _d.number_type, country: (_f = (_e = state$1.checkout) === null || _e === void 0 ? void 0 : _e.shipping_address) === null || _f === void 0 ? void 0 : _f.country, status: this.getStatus(), loading: formBusy(), onScChange: e => {
        e.stopImmediatePropagation();
        this.updateOrder(e.detail);
      }, otherLabel: this.otherLabel, caGstLabel: this.caGstLabel, auAbnLabel: this.auAbnLabel, gbVatLabel: this.gbVatLabel, euVatLabel: this.euVatLabel, required: this.required() }));
  }
};
ScOrderTaxIdInput.style = scOrderTaxIdInputCss;

export { ScCompactAddress as sc_compact_address, ScLineItemShipping as sc_line_item_shipping, ScLineItemTax as sc_line_item_tax, ScOrderBump as sc_order_bump, ScOrderBumps as sc_order_bumps, ScOrderShippingAddress as sc_order_shipping_address, ScOrderTaxIdInput as sc_order_tax_id_input };

//# sourceMappingURL=sc-compact-address_7.entry.js.map
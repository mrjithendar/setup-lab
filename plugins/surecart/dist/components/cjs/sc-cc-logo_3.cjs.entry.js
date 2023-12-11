'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scCcLogoCss = ":host{display:inline-block}.cc-logo{border-radius:var(--sc-cc-border-radius, 4px);line-height:0;overflow:hidden}";

const ScCcLogo = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.brand = undefined;
  }
  renderLogo() {
    if (['visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb', 'unionpay'].includes(this.brand)) {
      return index.h("sc-icon", { name: this.brand, style: { '--height': '0.63em' } });
    }
    return index.h("sc-icon", { name: "creditcard", style: { '--height': '0.63em' } });
  }
  render() {
    return (index.h("div", { class: "cc-logo", part: "base" }, this.renderLogo()));
  }
};
ScCcLogo.style = scCcLogoCss;

const scPaymentMethodCss = ":host{display:block}.payment-method{display:flex;align-items:center;justify-content:flex-start;gap:var(--sc-spacing-x-small)}";

const ScPaymentMethod = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.paymentMethod = undefined;
    this.full = undefined;
    this.externalLink = undefined;
    this.externalLinkTooltipText = undefined;
  }
  renderBankAccountType(type) {
    if (type === 'checking') {
      return wp.i18n.__('Checking', 'surecart');
    }
    if (type === 'savings') {
      return wp.i18n.__('Savings', 'surecart');
    }
  }
  renderExternalLink() {
    return (!!this.externalLink && (index.h("sc-tooltip", { text: this.externalLinkTooltipText, type: "text" }, index.h("sc-button", { style: { color: 'var(--sc-color-gray-500)' }, type: "text", size: "small", href: this.externalLink, target: "_blank" }, index.h("sc-icon", { name: "external-link", style: { fontSize: '16px' } })))));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    if ((_b = (_a = this.paymentMethod) === null || _a === void 0 ? void 0 : _a.bank_account) === null || _b === void 0 ? void 0 : _b.id) {
      const account = (_c = this.paymentMethod) === null || _c === void 0 ? void 0 : _c.bank_account;
      return (index.h("div", { class: "payment-method", part: "bank" }, index.h("span", null, this.renderBankAccountType(account === null || account === void 0 ? void 0 : account.account_type)), "**** ", account === null || account === void 0 ? void 0 :
        account.last4, this.renderExternalLink()));
    }
    if ((_e = (_d = this === null || this === void 0 ? void 0 : this.paymentMethod) === null || _d === void 0 ? void 0 : _d.payment_instrument) === null || _e === void 0 ? void 0 : _e.instrument_type) {
      const type = (_g = (_f = this === null || this === void 0 ? void 0 : this.paymentMethod) === null || _f === void 0 ? void 0 : _f.payment_instrument) === null || _g === void 0 ? void 0 : _g.instrument_type;
      if ([
        'applepay',
        'bancontact',
        'banktransfer',
        'belfius',
        'creditcard',
        'directdebit',
        'eps',
        'giftcard',
        'giropay',
        'ideal',
        'in3',
        'kbc',
        'klarna',
        'mybank',
        'paysafecard',
        'przelewy24',
        'sofort',
        'Voucher',
      ].includes(type)) {
        return (index.h("div", { class: "payment-method", part: "instrument" }, index.h("sc-icon", { style: { fontSize: '36px' }, name: type }), index.h("span", { style: { textTransform: 'capitalize' } }, type), this.renderExternalLink()));
      }
      if (type === 'paypal') {
        return (index.h("div", { class: "payment-method", part: "instrument" }, index.h("sc-icon", { style: { fontSize: '56px', lineHeight: '1', height: '28px' }, name: "paypal" })));
      }
      return (index.h("div", { class: "payment-method", part: "instrument" }, index.h("sc-tag", { exportparts: "base:payment_instrument", type: "info", pill: true }, index.h("span", { style: { textTransform: 'capitalize' } }, type, " ")), this.renderExternalLink()));
    }
    if ((_j = (_h = this.paymentMethod) === null || _h === void 0 ? void 0 : _h.card) === null || _j === void 0 ? void 0 : _j.brand) {
      return (index.h("div", { class: "payment-method", part: "card" }, index.h("sc-cc-logo", { style: { fontSize: '36px' }, brand: (_l = (_k = this.paymentMethod) === null || _k === void 0 ? void 0 : _k.card) === null || _l === void 0 ? void 0 : _l.brand }), index.h("sc-text", { style: { whiteSpace: 'nowrap', paddingRight: '6px' } }, "**** ", (_o = (_m = this.paymentMethod) === null || _m === void 0 ? void 0 : _m.card) === null || _o === void 0 ? void 0 :
        _o.last4), this.renderExternalLink()));
    }
    if ((_q = (_p = this.paymentMethod) === null || _p === void 0 ? void 0 : _p.paypal_account) === null || _q === void 0 ? void 0 : _q.id) {
      return (index.h("div", { class: "payment-method", part: "base", style: { gap: 'var(--sc-spacing-small)' } }, index.h("sc-icon", { style: { fontSize: '56px', lineHeight: '1', height: '28px' }, name: "paypal" }), this.full && (index.h("sc-text", { style: { '--font-size': 'var(--sc-font-size-small)' }, truncate: true }, (_s = (_r = this.paymentMethod) === null || _r === void 0 ? void 0 : _r.paypal_account) === null || _s === void 0 ? void 0 : _s.email)), this.renderExternalLink()));
    }
    return (_t = this === null || this === void 0 ? void 0 : this.paymentMethod) === null || _t === void 0 ? void 0 : _t.processor_type;
  }
};
ScPaymentMethod.style = scPaymentMethodCss;

const scTooltipCss = ".tooltip{position:relative}.tooltip--has-width .tooltip-text{white-space:normal;min-width:var(--sc-tooltip-width);max-width:var(--sc-tooltip-width)}.tooltip-text{position:fixed;background:var(--sc-color-gray-900);border-radius:var(--sc-border-radius-small);padding:var(--sc-spacing-small);font-family:var(--sc-input-font-family);font-size:var(--sc-input-font-size-small);white-space:nowrap;line-height:1.2;color:var(--sc-color-white);z-index:99999}.tooltip-text:after{content:\"\";position:absolute;transform:translateX(-50%);top:calc(100% - 1px);left:50%;height:0;width:0;border:7px solid transparent;border-top-color:var(--sc-color-gray-900)}.tooltip--primary .tooltip-text{background:var(--sc-color-primary-500)}.tooltip--primary .tooltip-text:after{border-top-color:var(--sc-color-primary-500)}.tooltip--success .tooltip-text{background:var(--sc-color-success-500)}.tooltip--success .tooltip-text:after{border-top-color:var(--sc-color-success-500)}.tooltip--info .tooltip-text{background:var(--sc-color-info-500)}.tooltip--info .tooltip-text:after{border-top-color:var(--sc-color-info-500)}.tooltip--warning .tooltip-text{background:var(--sc-color-warning-500)}.tooltip--warning .tooltip-text:after{border-top-color:var(--sc-color-warning-500)}.tooltip--danger .tooltip-text{background:var(--sc-color-danger-500)}.tooltip--danger .tooltip-text:after{border-top-color:var(--sc-color-danger-500)}";

const ScTooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.open = undefined;
    this.width = undefined;
    this.text = undefined;
    this.freeze = undefined;
    this.padding = 5;
    this.type = 'info';
    this.top = -10000;
    this.left = -10000;
  }
  componentDidLoad() {
    this.handleWindowScroll();
  }
  handleWindowScroll() {
    if (!this.open)
      return;
    if (!this.tooltip)
      return;
    var linkProps = this.tooltip.getBoundingClientRect();
    var tooltipProps = this.el.getBoundingClientRect();
    this.top = tooltipProps.top - (linkProps.height + this.padding);
    const min = Math.max(tooltipProps.left + tooltipProps.width / 2 - linkProps.width / 2 + this.padding, 0);
    this.left = Math.min(min, window.innerWidth - linkProps.width);
  }
  handleOpenChange() {
    setTimeout(() => this.handleWindowScroll(), 0);
  }
  handleBlur() {
    if (this.freeze)
      return;
    this.open = false;
  }
  handleClick() {
    if (this.freeze)
      return;
    this.open = true;
  }
  handleFocus() {
    if (this.freeze)
      return;
    this.open = true;
  }
  handleMouseOver() {
    if (this.freeze)
      return;
    this.open = true;
  }
  handleMouseOut() {
    if (this.freeze)
      return;
    this.open = false;
  }
  render() {
    if (!this.text) {
      return index.h("slot", null);
    }
    return (index.h("span", { part: "base", class: {
        'tooltip': true,
        // Types
        'tooltip--primary': this.type === 'primary',
        'tooltip--success': this.type === 'success',
        'tooltip--info': this.type === 'info',
        'tooltip--warning': this.type === 'warning',
        'tooltip--danger': this.type === 'danger',
        'tooltip--has-width': !!this.width,
      }, onClick: () => this.handleClick(), onBlur: () => this.handleBlur(), onFocus: () => this.handleFocus(), onMouseOver: () => this.handleMouseOver(), onMouseOut: () => this.handleMouseOut() }, index.h("slot", null), !!this.open && (index.h("div", { part: "text", ref: el => (this.tooltip = el), class: "tooltip-text", style: {
        top: `${this.top}px`,
        left: `${this.left}px`,
        ...(this.width ? { '--sc-tooltip-width': this.width } : {}),
      } }, this.text))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "open": ["handleOpenChange"]
  }; }
};
ScTooltip.style = scTooltipCss;

exports.sc_cc_logo = ScCcLogo;
exports.sc_payment_method = ScPaymentMethod;
exports.sc_tooltip = ScTooltip;

//# sourceMappingURL=sc-cc-logo_3.cjs.entry.js.map
import { r as registerInstance, c as createEvent, h } from './index-644f5478.js';
import { i as isRtl } from './page-align-8602c4c7.js';
import { g as getHumanDiscount } from './price-3e976a49.js';
import './currency-4692aeb2.js';

const scCouponFormCss = ":host {\n  display: block;\n}\n\nsc-button {\n  color: var(--sc-color-primary-500);\n}\n\n.coupon-form {\n  position: relative;\n  container-type: inline-size;\n}\n.coupon-form .coupon-button {\n  opacity: 0;\n  visibility: hidden;\n  transform: scale(0.9);\n  transition: all var(--sc-transition-fast) ease;\n}\n.coupon-form .coupon-button-mobile {\n  margin-top: var(--sc-input-label-margin);\n  display: none;\n}\n.coupon-form--has-value .coupon-button {\n  opacity: 1;\n  visibility: visible;\n  transform: scale(1);\n}\n\n@container (max-width: 320px) {\n  .coupon-form .coupon-button {\n    display: none;\n  }\n  .coupon-form .coupon-button-mobile {\n    display: block;\n  }\n}\n.form {\n  opacity: 0;\n  visibility: hidden;\n  height: 0;\n  transform: translateY(5px);\n  transition: opacity var(--sc-transition-medium) ease, transform var(--sc-transition-medium) ease;\n  position: relative;\n  gap: var(--sc-spacing-small);\n}\n\n.coupon-form--is-open .form {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n  height: auto;\n  margin: var(--sc-spacing-small) 0;\n}\n.coupon-form--is-open .trigger {\n  display: none;\n}\n\n.trigger {\n  cursor: pointer;\n  font-size: var(--sc-font-size-small);\n  line-height: var(--sc-line-height-dense);\n  color: var(--sc-input-label-color);\n  user-select: none;\n}\n.trigger:hover {\n  text-decoration: underline;\n}\n\n.coupon-form--is-rtl .trigger {\n  text-align: right;\n}";

const ScCouponForm = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scApplyCoupon = createEvent(this, "scApplyCoupon", 7);
    this.label = undefined;
    this.loading = undefined;
    this.busy = undefined;
    this.placeholder = undefined;
    this.error = undefined;
    this.forceOpen = undefined;
    this.discount = undefined;
    this.currency = undefined;
    this.discountAmount = undefined;
    this.showInterval = undefined;
    this.open = undefined;
    this.collapsed = undefined;
    this.value = undefined;
    this.buttonText = undefined;
  }
  /** Auto focus the input when opened. */
  handleOpenChange(val) {
    if (val) {
      setTimeout(() => this.input.triggerFocus(), 50);
    }
  }
  /** Close it when blurred and no value. */
  handleBlur() {
    if (!this.value) {
      this.open = false;
      this.error = '';
    }
  }
  /** Apply the coupon. */
  applyCoupon() {
    this.scApplyCoupon.emit(this.input.value.toUpperCase());
  }
  handleKeyDown(e) {
    if ((e === null || e === void 0 ? void 0 : e.code) === 'Enter') {
      this.applyCoupon();
    }
  }
  translateHumanDiscountWithDuration(humanDiscount) {
    var _a;
    if (!this.showInterval)
      return humanDiscount;
    const { duration, duration_in_months } = (_a = this.discount) === null || _a === void 0 ? void 0 : _a.coupon;
    switch (duration) {
      case 'once':
        return `${humanDiscount} ${wp.i18n.__('once', 'surecart')}`;
      case 'repeating':
        const monthsLabel = wp.i18n.sprintf(wp.i18n._n('%d month', '%d months', duration_in_months, 'surecart'), duration_in_months);
        // translators: %s is the discount amount, %s is the duration (e.g. 3 months)
        return wp.i18n.sprintf(wp.i18n.__('%s for %s', 'surecart'), humanDiscount, monthsLabel);
      default:
        return humanDiscount;
    }
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    if (this.loading) {
      return h("sc-skeleton", { style: { width: '120px', display: 'inline-block' } });
    }
    if ((_b = (_a = this === null || this === void 0 ? void 0 : this.discount) === null || _a === void 0 ? void 0 : _a.promotion) === null || _b === void 0 ? void 0 : _b.code) {
      let humanDiscount = '';
      if ((_c = this === null || this === void 0 ? void 0 : this.discount) === null || _c === void 0 ? void 0 : _c.coupon) {
        humanDiscount = getHumanDiscount((_d = this === null || this === void 0 ? void 0 : this.discount) === null || _d === void 0 ? void 0 : _d.coupon);
      }
      return (h("sc-line-item", { exportparts: "description:info, price-description:discount, price:amount" }, h("span", { slot: "description" }, h("div", { part: "discount-label" }, wp.i18n.__('Discount', 'surecart')), h("sc-tag", { exportparts: "base:coupon-tag", type: "success", class: "coupon-tag", clearable: true, tabindex: "0", onScClear: () => {
          this.scApplyCoupon.emit(null);
          this.open = false;
        }, onKeyDown: e => {
          if (e.key === 'Enter') {
            this.scApplyCoupon.emit(null);
            this.open = false;
          }
        } }, (_f = (_e = this === null || this === void 0 ? void 0 : this.discount) === null || _e === void 0 ? void 0 : _e.promotion) === null || _f === void 0 ? void 0 : _f.code)), humanDiscount && (h("span", { class: "coupon-human-discount", slot: "price-description" }, this.translateHumanDiscountWithDuration(humanDiscount))), h("span", { slot: "price" }, h("sc-format-number", { type: "currency", currency: this === null || this === void 0 ? void 0 : this.currency, value: this === null || this === void 0 ? void 0 : this.discountAmount }))));
    }
    return this.collapsed ? (h("div", { part: "base", class: {
        'coupon-form': true,
        'coupon-form--is-open': this.open || this.forceOpen,
        'coupon-form--has-value': !!this.value,
        'coupon-form--is-rtl': isRtl(),
      } }, h("div", { part: "label", class: "trigger", onMouseDown: () => {
        if (this.open) {
          return;
        }
        this.open = true;
      }, onKeyDown: e => {
        if (e.key !== 'Enter') {
          return true;
        }
        if (this.open) {
          return;
        }
        this.open = true;
      }, tabindex: "0" }, h("slot", { name: "label" }, this.label)), h("div", { class: "form", part: "form" }, h("sc-input", { exportparts: "base:input__base, input, form-control:input__form-control", value: this.value, onScInput: (e) => (this.value = e.target.value), placeholder: this.placeholder, onScBlur: () => this.handleBlur(), onKeyDown: e => this.handleKeyDown(e), ref: el => (this.input = el) }, h("sc-button", { exportparts: "base:button__base, label:button_label", slot: "suffix", type: "text", loading: this.busy, size: "medium", class: "coupon-button", onClick: () => this.applyCoupon() }, h("slot", null, this.buttonText))), h("sc-button", { exportparts: "base:button__base, label:button_label", type: "primary", outline: true, loading: this.busy, size: "medium", class: "coupon-button-mobile", onClick: () => this.applyCoupon() }, h("slot", null, this.buttonText)), !!this.error && (h("sc-alert", { exportparts: "base:error__base, icon:error__icon, text:error__text, title:error_title, message:error__message", type: "danger", open: true }, h("span", { slot: "title" }, this.error)))), this.loading && h("sc-block-ui", { exportparts: "base:block-ui, content:block-ui__content" }))) : (h("div", { class: {
        'coupon-form': true,
        'coupon-form--has-value': !!this.value,
        'coupon-form--is-rtl': isRtl(),
      } }, h("sc-input", { label: this.label, exportparts: "base:input__base, input, form-control:input__form-control", value: this.value, onScInput: (e) => (this.value = e.target.value), placeholder: this.placeholder, onScBlur: () => this.handleBlur(), onKeyDown: e => this.handleKeyDown(e), ref: el => (this.input = el) }, h("sc-button", { exportparts: "base:button__base, label:button_label", slot: "suffix", type: "text", loading: this.busy, size: "medium", class: "coupon-button", onClick: () => this.applyCoupon() }, h("slot", null, this.buttonText))), h("sc-button", { exportparts: "base:button__base, label:button_label", type: "primary", outline: true, loading: this.busy, size: "medium", class: "coupon-button-mobile", onClick: () => this.applyCoupon() }, h("slot", null, this.buttonText)), !!this.error && (h("sc-alert", { exportparts: "base:error__base, icon:error__icon, text:error__text, title:error_title, message:error__message", type: "danger", open: true }, h("span", { slot: "title" }, this.error)))));
  }
  static get watchers() { return {
    "open": ["handleOpenChange"]
  }; }
};
ScCouponForm.style = scCouponFormCss;

export { ScCouponForm as sc_coupon_form };

//# sourceMappingURL=sc-coupon-form.entry.js.map
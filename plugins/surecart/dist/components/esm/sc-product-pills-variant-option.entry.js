import { r as registerInstance, h } from './index-644f5478.js';
import { s as state, c as isOptionSoldOut, e as isOptionMissing } from './watchers-07474b8e.js';
import './index-1046c77e.js';
import './util-60cd51cc.js';
import './utils-f20e895e.js';

const scProductPillsVariantOptionCss = ".sc-product-pills-variant-option__wrapper{display:flex;flex-wrap:wrap;gap:var(--sc-spacing-x-small)}.sc-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}";

const ScProductPillsVariantOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = undefined;
    this.optionNumber = 1;
  }
  render() {
    return (h("sc-form-control", { label: this.label }, h("div", { class: "sc-product-pills-variant-option__wrapper" }, (state.variant_options[this.optionNumber - 1].values || []).map(value => {
      const isUnavailable = isOptionSoldOut(this.optionNumber, value) || isOptionMissing(this.optionNumber, value);
      return (h("sc-pill-option", { isUnavailable: isUnavailable, isSelected: state.variantValues[`option_${this.optionNumber}`] === value, onClick: () => (state.variantValues = {
          ...state.variantValues,
          [`option_${this.optionNumber}`]: value,
        }) }, h("span", { class: "sc-sr-only" }, wp.i18n.sprintf(wp.i18n.__('Select %s:', 'surecart'), this.label), " "), value, isUnavailable && h("span", { class: "sc-sr-only" }, " ", wp.i18n.__('(option unavailable)', 'surecart'), " ")));
    }))));
  }
};
ScProductPillsVariantOption.style = scProductPillsVariantOptionCss;

export { ScProductPillsVariantOption as sc_product_pills_variant_option };

//# sourceMappingURL=sc-product-pills-variant-option.entry.js.map
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-57356c46.js');
require('./index-00f0fc21.js');
require('./util-9c366e9f.js');
require('./utils-45815a15.js');

const scProductPillsVariantOptionCss = ".sc-product-pills-variant-option__wrapper{display:flex;flex-wrap:wrap;gap:var(--sc-spacing-x-small)}.sc-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}";

const ScProductPillsVariantOption = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.label = undefined;
    this.optionNumber = 1;
  }
  render() {
    return (index.h("sc-form-control", { label: this.label }, index.h("div", { class: "sc-product-pills-variant-option__wrapper" }, (watchers.state.variant_options[this.optionNumber - 1].values || []).map(value => {
      const isUnavailable = watchers.isOptionSoldOut(this.optionNumber, value) || watchers.isOptionMissing(this.optionNumber, value);
      return (index.h("sc-pill-option", { isUnavailable: isUnavailable, isSelected: watchers.state.variantValues[`option_${this.optionNumber}`] === value, onClick: () => (watchers.state.variantValues = {
          ...watchers.state.variantValues,
          [`option_${this.optionNumber}`]: value,
        }) }, index.h("span", { class: "sc-sr-only" }, wp.i18n.sprintf(wp.i18n.__('Select %s:', 'surecart'), this.label), " "), value, isUnavailable && index.h("span", { class: "sc-sr-only" }, " ", wp.i18n.__('(option unavailable)', 'surecart'), " ")));
    }))));
  }
};
ScProductPillsVariantOption.style = scProductPillsVariantOptionCss;

exports.sc_product_pills_variant_option = ScProductPillsVariantOption;

//# sourceMappingURL=sc-product-pills-variant-option.cjs.entry.js.map
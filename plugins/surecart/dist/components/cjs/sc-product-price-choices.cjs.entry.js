'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const price = require('./price-28f948f3.js');
const watchers = require('./watchers-57356c46.js');
require('./currency-2733c607.js');
require('./index-00f0fc21.js');
require('./util-9c366e9f.js');
require('./utils-45815a15.js');

const scProductPriceChoicesCss = ":host{display:block;text-align:left}";

const ScProductPriceChoices = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.label = undefined;
    this.showPrice = undefined;
  }
  renderPrice(price$1) {
    return (index.h(index.Fragment, null, index.h("sc-format-number", { type: "currency", value: price$1.amount, currency: price$1.currency }), index.h("span", { slot: "per" }, price.intervalString(price$1, {
      labels: {
        interval: wp.i18n.__('Every', 'surecart'),
        period: wp.i18n.__('for', 'surecart'),
        once: wp.i18n.__('Once', 'surecart'),
      },
      showOnce: true,
    }))));
  }
  render() {
    const prices = watchers.availablePrices();
    if ((prices === null || prices === void 0 ? void 0 : prices.length) < 2)
      return index.h(index.Host, { style: { display: 'none' } });
    return (index.h("sc-choices", { label: this.label, required: true, style: { '--sc-input-required-indicator': ' ' } }, (prices || []).map(price => {
      var _a, _b;
      return (index.h("sc-price-choice-container", { label: (price === null || price === void 0 ? void 0 : price.name) || ((_a = watchers.state.product) === null || _a === void 0 ? void 0 : _a.name), showPrice: !!this.showPrice, price: price, checked: ((_b = watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.selectedPrice) === null || _b === void 0 ? void 0 : _b.id) === (price === null || price === void 0 ? void 0 : price.id), onScChange: e => {
          if (e.target.checked) {
            watchers.state.selectedPrice = price;
          }
        } }));
    })));
  }
};
ScProductPriceChoices.style = scProductPriceChoicesCss;

exports.sc_product_price_choices = ScProductPriceChoices;

//# sourceMappingURL=sc-product-price-choices.cjs.entry.js.map
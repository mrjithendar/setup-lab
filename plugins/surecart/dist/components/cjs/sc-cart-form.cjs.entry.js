'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const index$1 = require('./index-49cf7c76.js');
const index$2 = require('./index-e302f7c9.js');
const google = require('./google-13aecc85.js');
const ui = require('./ui-aaeb2895.js');
const mutations = require('./mutations-957d9aea.js');
require('./watchers-eeca9c2e.js');
require('./watchers-d7bdd741.js');
require('./index-00f0fc21.js');
require('./getters-a4757e13.js');
require('./util-9c366e9f.js');
require('./utils-45815a15.js');
require('./fetch-2dba325c.js');
require('./add-query-args-17c551b6.js');
require('./get-query-arg-53bf21e2.js');
require('./currency-2733c607.js');
require('./store-68346eb0.js');

const query = {
  expand: [
    'line_items',
    'line_item.price',
    'price.product',
    'customer',
    'customer.shipping_address',
    'payment_intent',
    'discount',
    'discount.promotion',
    'discount.coupon',
    'shipping_address',
    'tax_identifier',
  ],
};
const ScCartForm = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.quantity = 1;
    this.priceId = undefined;
    this.variantId = undefined;
    this.mode = 'live';
    this.formId = undefined;
    this.busy = undefined;
    this.error = undefined;
  }
  /** Find a line item with this price. */
  getLineItem() {
    var _a, _b, _c;
    const lineItem = (((_b = (_a = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) || []).find(item => {
      var _a, _b, _c;
      if (this.variantId) {
        return ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.id) === this.variantId && ((_b = item.price) === null || _b === void 0 ? void 0 : _b.id) === this.priceId;
      }
      return ((_c = item.price) === null || _c === void 0 ? void 0 : _c.id) === this.priceId;
    });
    if (!(lineItem === null || lineItem === void 0 ? void 0 : lineItem.id)) {
      return false;
    }
    return {
      id: lineItem === null || lineItem === void 0 ? void 0 : lineItem.id,
      price_id: (_c = lineItem === null || lineItem === void 0 ? void 0 : lineItem.price) === null || _c === void 0 ? void 0 : _c.id,
      quantity: lineItem === null || lineItem === void 0 ? void 0 : lineItem.quantity,
    };
  }
  /** Add the item to cart. */
  async addToCart() {
    const { price } = await this.form.getFormJson();
    try {
      mutations.updateFormState('FETCH');
      // if it's ad_hoc, update the amount. Otherwise increment the quantity.
      google.state.checkout = await this.addOrUpdateLineItem({
        ...(!!price ? { ad_hoc_amount: parseInt(price) || null } : {}),
        ...(!!this.variantId ? { variant_id: this.variantId || null } : {}),
      });
      mutations.updateFormState('RESOLVE');
      // store the checkout in localstorage and open the cart
      ui.store.set('cart', { ...ui.store.state.cart, ...{ open: true } });
    }
    catch (e) {
      mutations.updateFormState('REJECT');
      console.error(e);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
  }
  async addOrUpdateLineItem(data = {}) {
    var _a, _b;
    // get the current line item from the price id.
    let lineItem = this.getLineItem();
    // convert line items response to line items post.
    let existingData = index$1.convertLineItemsToLineItemData(((_a = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) || []);
    // Line item does not exist. Add it.
    return (await index$2.createOrUpdateCheckout({
      id: (_b = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _b === void 0 ? void 0 : _b.id,
      data: {
        live_mode: this.mode === 'live',
        line_items: [
          ...(existingData || []).map((item) => {
            // if the price ids match (we have already a line item)
            if (this.priceId === (item === null || item === void 0 ? void 0 : item.price_id)) {
              return {
                ...item,
                ...(!!(data === null || data === void 0 ? void 0 : data.ad_hoc_amount) ? { ad_hoc_amount: data === null || data === void 0 ? void 0 : data.ad_hoc_amount } : {}),
                ...(!!(data === null || data === void 0 ? void 0 : data.variant_id) ? { variant_id: data === null || data === void 0 ? void 0 : data.variant_id } : {}),
                quantity: !(item === null || item === void 0 ? void 0 : item.ad_hoc_amount) ? (item === null || item === void 0 ? void 0 : item.quantity) + 1 : 1, // only increase quantity if not ad_hoc.
              };
            }
            // return item.
            return item;
          }),
          // add a line item if one does not exist.
          ...(!lineItem
            ? [
              {
                price_id: this.priceId,
                variant_id: this.variantId,
                ...(!!(data === null || data === void 0 ? void 0 : data.ad_hoc_amount) ? { ad_hoc_amount: data === null || data === void 0 ? void 0 : data.ad_hoc_amount } : {}),
                quantity: 1,
              },
            ]
            : []),
        ],
      },
      query: {
        ...query,
        form_id: this.formId,
      },
    }));
  }
  render() {
    return (index.h("sc-form", { ref: el => (this.form = el), onScSubmit: () => {
        this.addToCart();
      } }, this.error && (index.h("sc-alert", { open: !!this.error, type: "danger" }, index.h("span", { slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), index.h("slot", null)));
  }
};
ScCartForm.style = "sc-cart-form { display: inline-block }";

exports.sc_cart_form = ScCartForm;

//# sourceMappingURL=sc-cart-form.cjs.entry.js.map
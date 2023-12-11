'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const fetch = require('./fetch-2dba325c.js');
const lazy = require('./lazy-bc8baeab.js');
const price = require('./price-28f948f3.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
const getQueryArg = require('./get-query-arg-53bf21e2.js');
require('./currency-2733c607.js');

const scSubscriptionCss = ":host{display:block}.subscription{display:grid;gap:0.5em}.subscription a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.subscription a.cancel{color:var(--sc-color-danger-500)}";

const ScSubscription = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.subscriptionId = undefined;
    this.showCancel = undefined;
    this.heading = undefined;
    this.query = undefined;
    this.protocol = undefined;
    this.subscription = undefined;
    this.loading = undefined;
    this.cancelModal = undefined;
    this.busy = undefined;
    this.error = undefined;
  }
  componentWillLoad() {
    lazy.onFirstVisible(this.el, () => {
      if (!this.subscription) {
        this.getSubscription();
      }
    });
  }
  async cancelPendingUpdate() {
    var _a;
    const r = confirm(wp.i18n.__('Are you sure you want to cancel the pending update to your plan?', 'surecart'));
    if (!r)
      return;
    try {
      this.busy = true;
      this.subscription = (await fetch.apiFetch({
        path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/`, {
          expand: ['price', 'price.product', 'current_period', 'period.checkout', 'purchase', 'purchase.license', 'license.activations', 'discount', 'discount.coupon'],
        }),
        method: 'PATCH',
        data: {
          purge_pending_update: true,
        },
      }));
    }
    catch (e) {
      if (e === null || e === void 0 ? void 0 : e.message) {
        this.error = e.message;
      }
      else {
        this.error = wp.i18n.__('Something went wrong', 'surecart');
      }
      console.error(this.error);
    }
    finally {
      this.busy = false;
    }
  }
  async renewSubscription() {
    var _a;
    try {
      this.error = '';
      this.busy = true;
      this.subscription = (await fetch.apiFetch({
        path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/renew`, {
          expand: ['price', 'price.product', 'current_period', 'period.checkout', 'purchase', 'purchase.license', 'license.activations', 'discount', 'discount.coupon'],
        }),
        method: 'PATCH',
      }));
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = false;
    }
  }
  /** Get all subscriptions */
  async getSubscription() {
    var _a;
    try {
      this.loading = true;
      this.subscription = (await await fetch.apiFetch({
        path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId || ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id)}`, {
          expand: ['price', 'price.product', 'current_period'],
          ...(this.query || {}),
        }),
      }));
    }
    catch (e) {
      if (e === null || e === void 0 ? void 0 : e.message) {
        this.error = e.message;
      }
      else {
        this.error = wp.i18n.__('Something went wrong', 'surecart');
      }
      console.error(this.error);
    }
    finally {
      this.loading = false;
    }
  }
  renderName(subscription) {
    var _a;
    if (typeof ((_a = subscription === null || subscription === void 0 ? void 0 : subscription.price) === null || _a === void 0 ? void 0 : _a.product) !== 'string') {
      return price.productNameWithPrice(subscription === null || subscription === void 0 ? void 0 : subscription.price);
    }
    return wp.i18n.__('Subscription', 'surecart');
  }
  renderRenewalText(subscription) {
    const tag = index.h("sc-subscription-status-badge", { subscription: subscription });
    if ((subscription === null || subscription === void 0 ? void 0 : subscription.cancel_at_period_end) && subscription.current_period_end_at) {
      return (index.h("span", null, tag, " ", wp.i18n.sprintf(wp.i18n.__('Your plan will be canceled on', 'surecart')), ' ', index.h("sc-format-date", { date: subscription.current_period_end_at * 1000, month: "long", day: "numeric", year: "numeric" })));
    }
    if (subscription.status === 'trialing' && subscription.trial_end_at) {
      return (index.h("span", null, tag, " ", wp.i18n.sprintf(wp.i18n.__('Your plan begins on', 'surecart')), " ", index.h("sc-format-date", { date: subscription.trial_end_at * 1000, month: "long", day: "numeric", year: "numeric" })));
    }
    if (subscription.status === 'active' && subscription.current_period_end_at) {
      return (index.h("span", null, tag, " ", wp.i18n.sprintf(wp.i18n.__('Your plan renews on', 'surecart')), ' ', index.h("sc-format-date", { date: subscription.current_period_end_at * 1000, month: "long", day: "numeric", year: "numeric" })));
    }
    return tag;
  }
  renderEmpty() {
    return index.h("slot", { name: "empty" }, wp.i18n.__('This subscription does not exist.', 'surecart'));
  }
  renderLoading() {
    return (index.h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, index.h("div", { style: { padding: '0.5em' } }, index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '40%' } }))));
  }
  renderContent() {
    if (this.loading) {
      return this.renderLoading();
    }
    if (!this.subscription) {
      return this.renderEmpty();
    }
    return (index.h(index.Fragment, null, index.h("sc-subscription-next-payment", { subscription: this.subscription }, index.h("sc-subscription-details", { subscription: this.subscription }))));
  }
  render() {
    var _a, _b, _c, _d;
    return (index.h("sc-dashboard-module", { heading: this.heading || wp.i18n.__('Current Plan', 'surecart'), class: "subscription", error: this.error }, !!this.subscription && (index.h("sc-flex", { slot: "end" }, getQueryArg.getQueryArg(window.location.href, 'action') !== 'update_payment_method' && (index.h("sc-button", { type: "link", href: addQueryArgs.addQueryArgs(window.location.href, {
        action: 'update_payment_method',
      }) }, index.h("sc-icon", { name: "credit-card", slot: "prefix" }), wp.i18n.__('Update Payment Method', 'surecart'))), !!Object.keys((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.pending_update).length && (index.h("sc-button", { type: "link", onClick: () => this.cancelPendingUpdate() }, index.h("sc-icon", { name: "x-octagon", slot: "prefix" }), wp.i18n.__('Cancel Scheduled Update', 'surecart'))), ((_b = this === null || this === void 0 ? void 0 : this.subscription) === null || _b === void 0 ? void 0 : _b.cancel_at_period_end) ? (index.h("sc-button", { type: "link", onClick: () => this.renewSubscription() }, index.h("sc-icon", { name: "repeat", slot: "prefix" }), wp.i18n.__('Restore Plan', 'surecart'))) : (((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.status) !== 'canceled' &&
      ((_d = this.subscription) === null || _d === void 0 ? void 0 : _d.current_period_end_at) &&
      this.showCancel && (index.h("sc-button", { type: "link", onClick: () => (this.cancelModal = true) }, index.h("sc-icon", { name: "x", slot: "prefix" }), wp.i18n.__('Cancel Plan', 'surecart')))))), index.h("sc-card", { style: { '--overflow': 'hidden' }, noPadding: true }, this.renderContent()), this.busy && index.h("sc-block-ui", { spinner: true }), index.h("sc-cancel-dialog", { subscription: this.subscription, protocol: this.protocol, open: this.cancelModal, onScRequestClose: () => (this.cancelModal = false), onScRefresh: () => this.getSubscription() })));
  }
  get el() { return index.getElement(this); }
};
ScSubscription.style = scSubscriptionCss;

exports.sc_subscription = ScSubscription;

//# sourceMappingURL=sc-subscription.cjs.entry.js.map
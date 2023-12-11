'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const pure = require('./pure-5be33f24.js');
const watchers = require('./watchers-d7bdd741.js');
const getters = require('./getters-a4757e13.js');
const google = require('./google-13aecc85.js');
const store = require('./store-68346eb0.js');
const getters$1 = require('./getters-5c083014.js');
const mutations$1 = require('./mutations-2fd46f36.js');
const mutations = require('./mutations-957d9aea.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
require('./_commonjsHelpers-537d719a.js');
require('./index-00f0fc21.js');
require('./util-9c366e9f.js');
require('./utils-45815a15.js');
require('./currency-2733c607.js');
require('./get-query-arg-53bf21e2.js');

const scStripePaymentElementCss = "sc-stripe-payment-element{display:block}sc-stripe-payment-element [hidden]{display:none}.loader{display:grid;height:128px;gap:2em}.loader__row{display:flex;align-items:flex-start;justify-content:space-between;gap:1em}.loader__details{display:grid;gap:0.5em}";

const ScStripePaymentElement = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scPaid = index.createEvent(this, "scPaid", 7);
    this.scSetState = index.createEvent(this, "scSetState", 7);
    this.scPaymentInfoAdded = index.createEvent(this, "scPaymentInfoAdded", 7);
    this.error = undefined;
    this.confirming = false;
    this.loaded = false;
    this.styles = undefined;
  }
  async componentWillLoad() {
    this.fetchStyles();
  }
  async handleStylesChange() {
    this.createOrUpdateElements();
  }
  async fetchStyles() {
    this.styles = (await this.getComputedStyles());
  }
  /**
   * We wait for our property value to resolve (styles have been loaded)
   * This prevents the element appearance api being set before the styles are loaded.
   */
  getComputedStyles() {
    return new Promise(resolve => {
      let checkInterval = setInterval(() => {
        const styles = window.getComputedStyle(document.body);
        const color = styles.getPropertyValue('--sc-color-primary-500');
        if (color) {
          clearInterval(checkInterval);
          resolve(styles);
        }
      }, 100);
    });
  }
  /** Maybe load the stripe element on load. */
  async componentDidLoad() {
    const processor = (getters.availableProcessors() || []).find(processor => processor.processor_type === 'stripe');
    if (!processor) {
      return;
    }
    const { account_id, publishable_key } = (processor === null || processor === void 0 ? void 0 : processor.processor_data) || {};
    try {
      this.stripe = await pure.pure.loadStripe(publishable_key, { stripeAccount: account_id });
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Stripe could not be loaded', 'surecart');
      // don't continue.
      return;
    }
    // create or update elements.
    this.createOrUpdateElements();
    this.handleUpdateElement();
    this.unlistenToCheckout = google.onChange('checkout', () => {
      this.fetchStyles();
      this.createOrUpdateElements();
      this.handleUpdateElement();
    });
    // we need to listen to the form state and pay when the form state enters the paying state.
    this.unlistenToFormState = store.onChange('formState', () => {
      if ('finalizing' === getters$1.currentFormState()) {
        this.submit();
      }
      if ('paying' === getters$1.currentFormState()) {
        this.maybeConfirmOrder();
      }
    });
  }
  disconnectedCallback() {
    this.unlistenToFormState();
    this.unlistenToCheckout();
  }
  getElementsConfig() {
    var _a, _b, _c, _d;
    const styles = getComputedStyle(this.el);
    return {
      mode: ((_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.reusable_payment_method_required) ? 'subscription' : 'payment',
      amount: (_b = google.state.checkout) === null || _b === void 0 ? void 0 : _b.amount_due,
      currency: (_c = google.state.checkout) === null || _c === void 0 ? void 0 : _c.currency,
      setupFutureUsage: ((_d = google.state.checkout) === null || _d === void 0 ? void 0 : _d.reusable_payment_method_required) ? 'off_session' : null,
      appearance: {
        variables: {
          colorPrimary: styles.getPropertyValue('--sc-color-primary-500') || 'black',
          colorText: styles.getPropertyValue('--sc-input-label-color') || 'black',
          borderRadius: styles.getPropertyValue('--sc-input-border-radius-medium') || '4px',
          colorBackground: styles.getPropertyValue('--sc-input-background-color') || 'white',
          fontSizeBase: styles.getPropertyValue('--sc-input-font-size-medium') || '16px',
          colorLogo: styles.getPropertyValue('--sc-stripe-color-logo') || 'light',
          colorLogoTab: styles.getPropertyValue('--sc-stripe-color-logo-tab') || 'light',
          colorLogoTabSelected: styles.getPropertyValue('--sc-stripe-color-logo-tab-selected') || 'light',
          colorTextPlaceholder: styles.getPropertyValue('--sc-input-placeholder-color') || 'black',
        },
        rules: {
          '.Input': {
            border: styles.getPropertyValue('--sc-input-border'),
          },
        },
      },
    };
  }
  /** Update the payment element mode, amount and currency when it changes. */
  createOrUpdateElements() {
    var _a, _b, _c, _d;
    // need an order amount, etc.
    if (!((_a = google.state === null || google.state === void 0 ? void 0 : google.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required))
      return;
    // create the elements if they have not yet been created.
    if (!this.elements) {
      // we have what we need, load elements.
      this.elements = this.stripe.elements(this.getElementsConfig());
      const { line_1: line1, line_2: line2, city, state, country, postal_code } = ((_b = google.state.checkout) === null || _b === void 0 ? void 0 : _b.shipping_address) || {};
      // create the payment element.
      this.elements
        .create('payment', {
        defaultValues: {
          billingDetails: {
            name: (_c = google.state.checkout) === null || _c === void 0 ? void 0 : _c.name,
            email: (_d = google.state.checkout) === null || _d === void 0 ? void 0 : _d.email,
            address: {
              line1,
              line2,
              city,
              state,
              country,
              postal_code,
            },
          },
        },
        fields: {
          billingDetails: {
            email: 'never',
          },
        },
      })
        .mount(this.container);
      this.element = this.elements.getElement('payment');
      this.element.on('ready', () => (this.loaded = true));
      this.element.on('change', (event) => {
        var _a, _b, _c;
        if (event.complete) {
          this.scPaymentInfoAdded.emit({
            checkout_id: (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.id,
            processor_type: 'stripe',
            payment_method: {
              billing_details: {
                email: (_b = google.state.checkout) === null || _b === void 0 ? void 0 : _b.email,
                name: (_c = google.state.checkout) === null || _c === void 0 ? void 0 : _c.name,
              },
            },
          });
        }
      });
      return;
    }
    this.elements.update(this.getElementsConfig());
  }
  /** Update the default attributes of the element when they cahnge. */
  handleUpdateElement() {
    var _a, _b;
    if (!this.element)
      return;
    if (((_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.status) !== 'draft')
      return;
    const { name, email } = google.state.checkout;
    const { line_1: line1, line_2: line2, city, state, country, postal_code } = ((_b = google.state.checkout) === null || _b === void 0 ? void 0 : _b.shipping_address) || {};
    this.element.update({
      defaultValues: {
        billingDetails: {
          name,
          email,
          address: {
            line1,
            line2,
            city,
            state,
            country,
            postal_code,
          },
        },
      },
      fields: {
        billingDetails: {
          email: 'never',
        },
      },
    });
  }
  async submit() {
    // this processor is not selected.
    if ((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) !== 'stripe')
      return;
    // submit the elements.
    const { error } = await this.elements.submit();
    if (error) {
      console.error({ error });
      mutations.updateFormState('REJECT');
      mutations$1.createErrorNotice(error);
      this.error = error.message;
      return;
    }
  }
  /**
   * Watch order status and maybe confirm the order.
   */
  async maybeConfirmOrder() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    // this processor is not selected.
    if ((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) !== 'stripe')
      return;
    // must be a stripe session
    if (((_b = (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_type) !== 'stripe')
      return;
    // need an external_type
    if (!((_f = (_e = (_d = (_c = google.state.checkout) === null || _c === void 0 ? void 0 : _c.payment_intent) === null || _d === void 0 ? void 0 : _d.processor_data) === null || _e === void 0 ? void 0 : _e.stripe) === null || _f === void 0 ? void 0 : _f.type))
      return;
    // we need a client secret.
    if (!((_k = (_j = (_h = (_g = google.state.checkout) === null || _g === void 0 ? void 0 : _g.payment_intent) === null || _h === void 0 ? void 0 : _h.processor_data) === null || _j === void 0 ? void 0 : _j.stripe) === null || _k === void 0 ? void 0 : _k.client_secret))
      return;
    // confirm the intent.
    return await this.confirm((_p = (_o = (_m = (_l = google.state.checkout) === null || _l === void 0 ? void 0 : _l.payment_intent) === null || _m === void 0 ? void 0 : _m.processor_data) === null || _o === void 0 ? void 0 : _o.stripe) === null || _p === void 0 ? void 0 : _p.type);
  }
  async confirm(type, args = {}) {
    var _a, _b, _c, _d;
    const confirmArgs = {
      elements: this.elements,
      clientSecret: (_d = (_c = (_b = (_a = google.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data) === null || _c === void 0 ? void 0 : _c.stripe) === null || _d === void 0 ? void 0 : _d.client_secret,
      confirmParams: {
        return_url: addQueryArgs.addQueryArgs(window.location.href, {
          ...(google.state.checkout.id ? { checkout_id: google.state.checkout.id } : {}),
        }),
        payment_method_data: {
          billing_details: {
            email: google.state.checkout.email,
          },
        },
      },
      redirect: 'if_required',
      ...args,
    };
    // prevent possible double-charges
    if (this.confirming)
      return;
    // stripe must be loaded.
    if (!this.stripe)
      return;
    try {
      this.scSetState.emit('PAYING');
      const response = type === 'setup' ? await this.stripe.confirmSetup(confirmArgs) : await this.stripe.confirmPayment(confirmArgs);
      if (response === null || response === void 0 ? void 0 : response.error) {
        this.error = response.error.message;
        throw response.error;
      }
      else {
        this.scSetState.emit('PAID');
        // paid
        this.scPaid.emit();
      }
    }
    catch (e) {
      console.error(e);
      mutations.updateFormState('REJECT');
      mutations$1.createErrorNotice(e);
      if (e.message) {
        this.error = e.message;
      }
    }
    finally {
      this.confirming = false;
    }
  }
  render() {
    return (index.h("div", { class: "sc-stripe-payment-element", "data-testid": "stripe-payment-element" }, !!this.error && (index.h("sc-text", { style: {
        'color': 'var(--sc-color-danger-500)',
        '--font-size': 'var(--sc-font-size-small)',
        'marginBottom': '0.5em',
      } }, this.error)), index.h("div", { class: "loader", hidden: this.loaded }, index.h("div", { class: "loader__row" }, index.h("div", { style: { width: '50%' } }, index.h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", null)), index.h("div", { style: { flex: '1' } }, index.h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", null)), index.h("div", { style: { flex: '1' } }, index.h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", null))), index.h("div", { class: "loader__details" }, index.h("sc-skeleton", { style: { height: '1rem' } }), index.h("sc-skeleton", { style: { height: '1rem', width: '30%' } }))), index.h("div", { hidden: !this.loaded, class: "sc-payment-element-container", ref: el => (this.container = el) })));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "styles": ["handleStylesChange"]
  }; }
};
ScStripePaymentElement.style = scStripePaymentElementCss;

exports.sc_stripe_payment_element = ScStripePaymentElement;

//# sourceMappingURL=sc-stripe-payment-element.cjs.entry.js.map
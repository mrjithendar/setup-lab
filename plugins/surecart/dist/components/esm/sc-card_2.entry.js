import { r as registerInstance, h, a as getElement } from './index-644f5478.js';

const scCardCss = ":host{display:block;--overflow:visible}.card{font-family:var(--sc-font-sans);overflow:var(--overflow);display:block}.card:not(.card--borderless){padding:var(--sc-card-padding, var(--sc-spacing-large));background:var(--sc-card-background-color, var(--sc-color-white));border:1px solid var(--sc-card-border-color, var(--sc-color-gray-300));border-radius:var(--sc-input-border-radius-medium);box-shadow:var(--sc-shadow-small)}.card:not(.card--borderless).card--no-padding{padding:0}.title--divider{display:none}.card--has-title-slot .card--title{font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense)}.card--has-title-slot .title--divider{display:block}::slotted(*){margin-bottom:var(--sc-form-row-spacing)}::slotted(*:first-child){margin-top:0}::slotted(*:last-child){margin-bottom:0 !important}";

const ScCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.noDivider = undefined;
    this.borderless = undefined;
    this.noPadding = undefined;
    this.href = undefined;
    this.loading = undefined;
    this.hasTitleSlot = undefined;
  }
  componentWillLoad() {
    this.handleSlotChange();
  }
  handleSlotChange() {
    this.hasTitleSlot = !!this.el.querySelector('[slot="title"]');
  }
  render() {
    const Tag = this.href ? 'a' : 'div';
    return (h(Tag, { part: "base", class: {
        'card': true,
        'card--borderless': this.borderless,
        'card--no-padding': this.noPadding,
      } }, h("slot", null)));
  }
  get el() { return getElement(this); }
};
ScCard.style = scCardCss;

const scDashboardModuleCss = ":host{display:block;position:relative}.dashboard-module{display:grid;gap:var(--sc-dashboard-module-spacing, 1em)}.heading{font-family:var(--sc-font-sans);display:flex;flex-wrap:wrap;gap:1em;align-items:center;justify-content:space-between}.heading__text{display:grid;flex:1;gap:calc(var(--sc-dashboard-module-spacing, 1em) / 2)}@media screen and (min-width: 720px){.heading{gap:2em}}.heading__title{font-size:var(--sc-dashbaord-module-heading-size, var(--sc-font-size-x-large));font-weight:var(--sc-dashbaord-module-heading-weight, var(--sc-font-weight-bold));line-height:var(--sc-dashbaord-module-heading-line-height, var(--sc-line-height-dense));white-space:nowrap}.heading__description{font-size:var(--sc-font-size-normal);line-height:var(--sc-line-height-dense);opacity:0.85}";

const ScDashboardModule = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.heading = undefined;
    this.error = undefined;
    this.loading = undefined;
  }
  render() {
    return (h("div", { class: "dashboard-module", part: "base" }, !!this.error && (h("sc-alert", { exportparts: "base:error__base, icon:error__icon, text:error__text, title:error__title, message:error__message", open: !!this.error, type: "danger" }, h("span", { slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), h("div", { class: "heading", part: "heading" }, h("div", { class: "heading__text", part: "heading-text" }, h("div", { class: "heading__title", part: "heading-title" }, h("slot", { name: "heading" }, this.heading)), h("div", { class: "heading__description", part: "heading-description" }, h("slot", { name: "description" }))), h("slot", { name: "end" })), h("slot", null)));
  }
};
ScDashboardModule.style = scDashboardModuleCss;

export { ScCard as sc_card, ScDashboardModule as sc_dashboard_module };

//# sourceMappingURL=sc-card_2.entry.js.map
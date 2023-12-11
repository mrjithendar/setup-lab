'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scLicensesListCss = ":host{display:block}";

const ScLicensesList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.licenses = [];
    this.activations = [];
    this.heading = undefined;
    this.copied = undefined;
  }
  renderStatus(status) {
    if (status === 'active') {
      return index.h("sc-tag", { type: "success" }, wp.i18n.__('Active', 'surecart'));
    }
    if (status === 'revoked') {
      return index.h("sc-tag", { type: "danger" }, wp.i18n.__('Revoked', 'surecart'));
    }
    if (status === 'inactive') {
      return index.h("sc-tag", { type: "info" }, wp.i18n.__('Inactive', 'surecart'));
    }
    return index.h("sc-tag", { type: "info" }, status);
  }
  async copyKey(key) {
    try {
      await navigator.clipboard.writeText(key);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
    catch (err) {
      console.error(err);
      alert(wp.i18n.__('Error copying to clipboard', 'surecart'));
    }
  }
  render() {
    return (index.h("sc-dashboard-module", { class: "purchase", part: "base" }, index.h("span", { slot: "heading" }, index.h("slot", { name: "heading" }, this.heading || wp.i18n.__('License Keys', 'surecart'))), index.h("sc-card", { "no-padding": true }, index.h("sc-table", null, index.h("sc-table-cell", { slot: "head" }, wp.i18n.__('Key', 'surecart')), index.h("sc-table-cell", { slot: "head", style: { width: '100px' } }, wp.i18n.__('Status', 'surecart')), index.h("sc-table-cell", { slot: "head", style: { width: '100px' } }, wp.i18n.__('Activations', 'surecart')), this.licenses.map(({ key, status, activations, activation_limit }) => {
      var _a;
      return (index.h("sc-table-row", { style: { '--columns': '3' } }, index.h("sc-table-cell", null, index.h("sc-input", { value: key, readonly: true }, index.h("sc-button", { type: "default", size: "small", slot: "suffix", onClick: () => this.copyKey(key) }, this.copied ? wp.i18n.__('Copied!', 'surecart') : wp.i18n.__('Copy', 'surecart')))), index.h("sc-table-cell", null, this.renderStatus(status)), index.h("sc-table-cell", null, (_a = activations === null || activations === void 0 ? void 0 : activations.pagination) === null || _a === void 0 ? void 0 :
        _a.count, " / ", activation_limit || index.h("span", null, "\u221E"))));
    })))));
  }
};
ScLicensesList.style = scLicensesListCss;

exports.sc_licenses_list = ScLicensesList;

//# sourceMappingURL=sc-licenses-list.cjs.entry.js.map
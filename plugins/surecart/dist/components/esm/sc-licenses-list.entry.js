import { r as registerInstance, h } from './index-644f5478.js';

const scLicensesListCss = ":host{display:block}";

const ScLicensesList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.licenses = [];
    this.activations = [];
    this.heading = undefined;
    this.copied = undefined;
  }
  renderStatus(status) {
    if (status === 'active') {
      return h("sc-tag", { type: "success" }, wp.i18n.__('Active', 'surecart'));
    }
    if (status === 'revoked') {
      return h("sc-tag", { type: "danger" }, wp.i18n.__('Revoked', 'surecart'));
    }
    if (status === 'inactive') {
      return h("sc-tag", { type: "info" }, wp.i18n.__('Inactive', 'surecart'));
    }
    return h("sc-tag", { type: "info" }, status);
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
    return (h("sc-dashboard-module", { class: "purchase", part: "base" }, h("span", { slot: "heading" }, h("slot", { name: "heading" }, this.heading || wp.i18n.__('License Keys', 'surecart'))), h("sc-card", { "no-padding": true }, h("sc-table", null, h("sc-table-cell", { slot: "head" }, wp.i18n.__('Key', 'surecart')), h("sc-table-cell", { slot: "head", style: { width: '100px' } }, wp.i18n.__('Status', 'surecart')), h("sc-table-cell", { slot: "head", style: { width: '100px' } }, wp.i18n.__('Activations', 'surecart')), this.licenses.map(({ key, status, activations, activation_limit }) => {
      var _a;
      return (h("sc-table-row", { style: { '--columns': '3' } }, h("sc-table-cell", null, h("sc-input", { value: key, readonly: true }, h("sc-button", { type: "default", size: "small", slot: "suffix", onClick: () => this.copyKey(key) }, this.copied ? wp.i18n.__('Copied!', 'surecart') : wp.i18n.__('Copy', 'surecart')))), h("sc-table-cell", null, this.renderStatus(status)), h("sc-table-cell", null, (_a = activations === null || activations === void 0 ? void 0 : activations.pagination) === null || _a === void 0 ? void 0 :
        _a.count, " / ", activation_limit || h("span", null, "\u221E"))));
    })))));
  }
};
ScLicensesList.style = scLicensesListCss;

export { ScLicensesList as sc_licenses_list };

//# sourceMappingURL=sc-licenses-list.entry.js.map
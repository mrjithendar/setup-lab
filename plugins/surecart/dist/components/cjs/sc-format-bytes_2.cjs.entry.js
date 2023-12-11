'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scFormatBytesCss = ":host{display:inline-block}";

const ScFormatBytes = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.locale = undefined;
    this.value = 0;
    this.unit = 'byte';
    this.display = 'short';
  }
  render() {
    if (isNaN(this.value)) {
      return '';
    }
    const bitPrefixes = ['', 'kilo', 'mega', 'giga', 'tera']; // petabit isn't a supported unit
    const bytePrefixes = ['', 'kilo', 'mega', 'giga', 'tera', 'peta'];
    const prefix = this.unit === 'bit' ? bitPrefixes : bytePrefixes;
    const index = Math.max(0, Math.min(Math.floor(Math.log10(this.value) / 3), prefix.length - 1));
    const unit = prefix[index] + this.unit;
    const valueToFormat = parseFloat((this.value / Math.pow(1000, index)).toPrecision(3));
    return new Intl.NumberFormat(this.locale, { style: 'unit', unit, unitDisplay: this.display }).format(valueToFormat);
  }
};
ScFormatBytes.style = scFormatBytesCss;

const scSpacingCss = ":host{display:block}::slotted(*:not(:last-child)){margin-bottom:var(--spacing)}";

const ScSpacing = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null)));
  }
};
ScSpacing.style = scSpacingCss;

exports.sc_format_bytes = ScFormatBytes;
exports.sc_spacing = ScSpacing;

//# sourceMappingURL=sc-format-bytes_2.cjs.entry.js.map
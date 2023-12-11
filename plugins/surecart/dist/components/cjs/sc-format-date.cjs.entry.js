'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const ScFormatDate = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.locale = undefined;
    this.date = new Date();
    this.weekday = undefined;
    this.era = undefined;
    this.year = undefined;
    this.month = undefined;
    this.day = undefined;
    this.hour = undefined;
    this.minute = undefined;
    this.second = undefined;
    this.timeZoneName = undefined;
    this.timeZone = undefined;
    this.hourFormat = 'auto';
    this.type = 'date';
  }
  render() {
    const dateString = this.type === 'timestamp' ? parseInt(this.date.toString()) * 1000 : this.date;
    const date = new Date(dateString);
    const hour12 = this.hourFormat === 'auto' ? undefined : this.hourFormat === '12';
    // Check for an invalid date
    if (isNaN(date.getMilliseconds())) {
      return;
    }
    return new Intl.DateTimeFormat(this.locale, {
      weekday: this.weekday,
      era: this.era,
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      timeZoneName: this.timeZoneName,
      timeZone: this.timeZone,
      hour12: hour12,
    }).format(date);
  }
};

exports.sc_format_date = ScFormatDate;

//# sourceMappingURL=sc-format-date.cjs.entry.js.map
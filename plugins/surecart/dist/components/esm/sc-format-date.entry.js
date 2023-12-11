import { r as registerInstance } from './index-644f5478.js';

const ScFormatDate = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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

export { ScFormatDate as sc_format_date };

//# sourceMappingURL=sc-format-date.entry.js.map
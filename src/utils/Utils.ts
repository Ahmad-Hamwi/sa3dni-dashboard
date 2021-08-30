import ms from "ms";

export default class Utils {
  static getLast7DaysDate(): Date {
    const date = new Date();

    date.setDate(date.getDate() - 7);

    return date;
  }

  static getPreviousMonthDate(sub: number): Date {
    const date = new Date();

    date.setMonth(date.getMonth() - sub);

    return date;
  }

  static convertMillisecondsToPeriod(milliseconds?: number): string {
    return milliseconds ? ms(milliseconds) : "";
  }
}
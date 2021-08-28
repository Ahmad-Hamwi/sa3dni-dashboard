export default class Utils {

    static getLast7DaysDate(): Date {
        const date = new Date()

        date.setDate(date.getDate() - 7)

        return date
    }

    static getPreviousMonthDate(sub: number): Date {
        const date = new Date()

        date.setMonth(date.getMonth() - sub)

        return date
    }

    static convertMillisecondsToPeriod(milliseconds: number): string {
        const seconds = parseInt((milliseconds / 1000).toFixed(1));
        const minutes = parseInt((milliseconds / (1000 * 60)).toFixed(1));
        const hours = parseInt((milliseconds / (1000 * 60 * 60)).toFixed(1));
        const days = parseInt((milliseconds / (1000 * 60 * 60 * 24)).toFixed(1));
        if (seconds < 60) return seconds + " sec";
        else if (minutes < 60) return minutes + " min";
        else if (hours < 24) return hours + " h";
        else return days + " day"
    }

}
export class MainHelpers {
    public static compareDate(date1: Date, date2: Date): number {
        const d1 = new Date(date1); const d2 = new Date(date2);
        const same = d1.getTime() === d2.getTime();
        if (same) {
            return 0;
        }
        if (d1 > d2) {
            return 1;
        }
        if (d1 < d2) {
            return -1;
        }
    }

}

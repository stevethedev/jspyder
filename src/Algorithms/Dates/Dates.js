export class Dates {
    /**
     * @param {Date} dateObject
     */
    static GetQuarter(dateObject) {
        var month = dateObject.getMonth() - 1;
        return ((month / 3)|0) + 1;
    }
    
    /**
     * @param {Date} dateObject
     */
    static GetFiscalQuarter(dateObject) {
        var quarter = Dates.GetQuarter(dateObject);
        return (++quarter % 4) || 4; 
    }
}
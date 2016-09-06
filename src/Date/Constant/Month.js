import { MONTH_LONG_U,  MONTH_LONG_L, 
         MONTH_SHORT_U, MONTH_SHORT_L, 
         MONTH_DDIGIT, 
         MONTH_SDIGIT }
    from "Date/Constant/Constant";

export const MONTH_KEYS = [
    MONTH_LONG_U,
    MONTH_LONG_L,
    MONTH_SHORT_U,
    MONTH_SHORT_L,
    MONTH_DDIGIT,
    MONTH_SDIGIT 
];
const JANUARY = { 
    [MONTH_SDIGIT]:  "1", 
    [MONTH_DDIGIT]: "01", 
    [MONTH_SHORT_L]: "Jan", 
    [MONTH_LONG_L]: "January",
    [MONTH_SHORT_U]: "JAN",
    [MONTH_LONG_L]: "JANUARY"
};
const FEBRUARY = { 
    [MONTH_SDIGIT]:  "2", 
    [MONTH_DDIGIT]: "02", 
    [MONTH_SHORT_L]: "Feb", 
    [MONTH_LONG_L]: "February",
    [MONTH_SHORT_U]: "FEB",
    [MONTH_LONG_L]: "FEBRUARY"
};
const MARCH = { 
    [MONTH_SDIGIT]:  "3", 
    [MONTH_DDIGIT]: "03", 
    [MONTH_SHORT_L]: "Mar", 
    [MONTH_LONG_L]: "March",
    [MONTH_SHORT_U]: "MAR",
    [MONTH_LONG_L]: "MARCH"
};
const APRIL = { 
    [MONTH_SDIGIT]:  "4", 
    [MONTH_DDIGIT]: "04", 
    [MONTH_SHORT_L]: "Apr", 
    [MONTH_LONG_L]: "April",
    [MONTH_SHORT_U]: "APR",
    [MONTH_LONG_L]: "APRIL"  
};
const MAY = { 
    [MONTH_SDIGIT]:  "5", 
    [MONTH_DDIGIT]: "05", 
    [MONTH_SHORT_L]: "May", 
    [MONTH_LONG_L]: "May",
    [MONTH_SHORT_U]: "MAY",
    [MONTH_LONG_L]: "MAY"    
};
const JUNE = { 
    [MONTH_SDIGIT]:  "6", 
    [MONTH_DDIGIT]: "06", 
    [MONTH_SHORT_L]: "Jun", 
    [MONTH_LONG_L]: "June",
    [MONTH_SHORT_U]: "JUN",
    [MONTH_LONG_L]: "JUNE"   
};
const JULY = { 
    [MONTH_SDIGIT]:  "7", 
    [MONTH_DDIGIT]: "07", 
    [MONTH_SHORT_L]: "Jul", 
    [MONTH_LONG_L]: "July",
    [MONTH_SHORT_U]: "JUL",
    [MONTH_LONG_L]: "JULY"   
};
const AUGUST = { 
    [MONTH_SDIGIT]:  "8", 
    [MONTH_DDIGIT]: "08", 
    [MONTH_SHORT_L]: "Aug", 
    [MONTH_LONG_L]: "August",
    [MONTH_SHORT_U]: "AUG",
    [MONTH_LONG_L]: "AUGUST" 
};
const SEPTEMBER = { 
    [MONTH_SDIGIT]:  "9", 
    [MONTH_DDIGIT]: "09", 
    [MONTH_SHORT_L]: "Sep", 
    [MONTH_LONG_L]: "September",
    [MONTH_SHORT_U]: "SEP",
    [MONTH_LONG_L]: "SEPTEMBER"
};
const OCTOBER = { 
    [MONTH_SDIGIT]: "10", 
    [MONTH_DDIGIT]: "10", 
    [MONTH_SHORT_L]: "Oct", 
    [MONTH_LONG_L]: "October",
    [MONTH_SHORT_U]: "OCT",
    [MONTH_LONG_L]: "OCTOBER"
};
const NOVEMBER = { 
    [MONTH_SDIGIT]: "11", 
    [MONTH_DDIGIT]: "11", 
    [MONTH_SHORT_L]: "Nov", 
    [MONTH_LONG_L]: "November",
    [MONTH_SHORT_U]: "NOV",
    [MONTH_LONG_L]: "NOVEMBER"
};
const DECEMBER = { 
    [MONTH_SDIGIT]: "12", 
    [MONTH_DDIGIT]: "12", 
    [MONTH_SHORT_L]: "Dec", 
    [MONTH_LONG_L]: "December",
    [MONTH_SHORT_U]: "DEC",
    [MONTH_LONG_L]: "DECEMBER"
};

export const MONTH_LOOKUP = [
    JANUARY,
    FEBRUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE, 
    JULY,
    AUGUST,
    SEPTEMBER,
    OCTOBER,
    NOVEMBER,
    DECEMBER
];

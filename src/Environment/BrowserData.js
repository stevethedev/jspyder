export const BROWSER_IE = "IE";
export const BROWSER_EDGE = "Edge";

export const BROWSER_FIREFOX = "Firefox";

export const BROWSER_OPERA = "Opera";
export const BROWSER_OPERA_MINI = "Opera Mini";

export const BROWSER_SAFARI = "Safari";
export const BROWSER_SAFARI_IOS = "iOS Safari";

export const BROWSER_CHROME = "Chrome";
export const BROWSER_CHROME_ANDROID = "Chrome for Android";
export const BROWSER_ANDROID = "Android BrowserData";

export const BROWSER_UNKNOWN = "Unknown BrowserData";

export class BrowserData {
    // Ducktypes Browser Name
    static BrowserName() {
        if(window["MSInputMethodContext"]) {
            return BROWSER_EDGE;
        }
        else if(window.eval("/*@cc_on!@*/false") || window["document"]["documentMode"]) {
            return BROWSER_IE;
        }
        
        else if (typeof window["InstallTrigger"] !== 'undefined') {
            return BROWSER_FIREFOX;
        }
        
        else if (window["opera"] || window["navigator"]["userAgent"].indexOf(' OPR/') >= 0) {
            return BROWSER_OPERA;
        }
        else if(window["operamini"]) {
            return BROWSER_OPERA_MINI;
        }
        
        else if(window["chrome"]) {
            return BROWSER_CHROME;
        }
        else if(/Android.*Chrome/.test(window["navigator"]["userAgent"])) {
            return BROWSER_CHROME_ANDROID;
        }
        else if (/Android.*Mozilla\/5.0.*AppleWebKit/.test(window["navigator"]["userAgent"])) {
            return BROWSER_ANDROID;
        }
        
        else if (Object["prototype"]["toString"].call(window["HTMLElement"]).indexOf('Constructor') > 0) {
            return BROWSER_SAFARI;
        }
        
        else if (/iP(ad|hone|od)/.test(window["navigator"]["userAgent"])) {
            return BROWSER_SAFARI_IOS;
        }
        
        return BROWSER_UNKNOWN;
    }
    
    // Ducktypes Browser Version
    static BrowserVersion(name = BrowserData.BrowserName()) {
        switch(name) {
            case BROWSER_ANDROID:
                return BrowserData.AndroidVersion();
                
            case BROWSER_CHROME:
                return BrowserData.ChromeVersion();
                
            case BROWSER_CHROME_ANDROID:
                return BrowserData.AndroidChromeVersion();
                
            case BROWSER_EDGE:
                return BrowserData.EdgeVersion();
                
            case BROWSER_FIREFOX:
                return BrowserData.FirefoxVersion();
                
            case BROWSER_IE:
                return BrowserData.IeVersion();
                
            case BROWSER_OPERA:
                return BrowserData.OperaVersion();
                
            case BROWSER_OPERA_MINI:
                return BrowserData.OperaMiniVersion();
                
            case BROWSER_SAFARI:
                return BrowserData.SafariVersion();
                
            case BROWSER_SAFARI_IOS:
                return BrowserData.SafariIosVersion();
                
            default:
                return 0;
        }
    }
    
    // Ducktypes Internet Explorer
    static IeVersion() {
        if(!window["attachEvent"]) {
            return 11;
        }
        else if(window.eval("/*@cc_on (document.documentMode == 10)!=@*/false")) {
            return 10;
        }
        else if(window["requestAnimationFrame"]) {
            return 9;
        }
        else if(!window["addEventListener"]) {
            return 8;
        }
        else {
            return 7;
        }
    }
    
    // Ducktypes FireFox version number
    static FirefoxVersion() {
        if(window["Int8Array"] && window["Int8Array"]["prototype"]["sort"]) {
            return 46;
        }
        else if(window["Node"]["innerText"]) {
            return 45;
        }
        else if(window["Document"]["charset"]) {
            return 44;
        }
        else if(window["Array"]["prototype"]["includes"]) {
            return 43;
        }
        else if("undefined" === typeof window["Reflect"]) {
            return 42;
        }
        else {
            return 41;
        }
    }
    
    // Ducktypes Opera version
    static OperaVersion() {
        return 1;
    }
    
    // Ducktypes Opera Mini
    static OperaMiniVersion() {
        return 8;
    }
    
    // Ducktypes Chrome version
    static ChromeVersion() {
        return 45;
    }
    
    // Ducktypes Safari
    static SafariVersion() {
        if(window["CSS"]["supports"]) {
            return 9;
        }
        else {
            return 8;
        }
    }
    
    // Ducktypes Safari IOS
    static SafariIosVersion() {
        return 8.4;
    }
    
    // Ducktypes Edge
    static EdgeVersion() {
        if(window["Symbol"] && window["JSON"] && window["JSON"].stringify({ foo: window["Symbol"]() }) === "{}") {
            return 13;
        }
        else if(!window["RTCIceGatherOptions"]) {
            return 12;
        }
        else {
            return 11;
        }
    }
    
    // Ducktypes Android
    static AndroidVersion() {
        return 4.3;
    }
    
    // Ducktypes Android Chrome
    static AndroidChromeVersion() {
        return 47;
    }
}
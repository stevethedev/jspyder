import {BrowserData} from "Environment/BrowserData";

const BROWSER_NAME = BrowserData.BrowserName();
const BROWSER_VERSION = BrowserData.BrowserVersion(BROWSER_NAME);

export class Browser {
    static get version() { return BROWSER_VERSION; }
    static get name() { return BROWSER_NAME; }
    static toString() { return `${this.name} ${this.version}`; }
}
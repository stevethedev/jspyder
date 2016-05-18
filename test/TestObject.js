class Test {
    constructor(name, fn) {
        this.name = name;
        this.fn = fn;
    }
}

const INDENT_CHARACTER = "    ";
var indentCount = 0;
function indent() {
    var str = "";
    for(let i = indentCount; i > 0; --i) {
        str += INDENT_CHARACTER;
    }
    return str;
}

var outputFunction = function(message) {};
export class TestObject {
    constructor(suiteName) {
        this.name = suiteName;
        this.tests = [];
    }

    static setLogger(logFunction) {
        outputFunction = logFunction;
    }

    addTest(name, testFunction) {
        this.tests.push(new Test(name, testFunction));
    }

    log(message) {
        console.log(indent() + message);
        outputFunction(indent() + message);
    }

    logIndent(change = 1) {
        if(change > 0) this.log("\r\n");
        indentCount += change;
    }

    /** @suppress {accessControls} */
    autoloadTests() {
        var properties = Object.getOwnPropertyNames(this.prototype);
        for(let i = 0; i < properties.length; ++i) {
            let property = properties[i];
            if(/^test/.test(property)) {
                this.addTest(`${this.name}.${property}`, this[property]);
            }
        }
    }

    startTests() {
        var test = function() { }
        var count = 0;
        var total = this.tests.length;

        this.log(`Starting Suite: ${this.name}`);
        this.logIndent(1);

        while(test = this.tests.shift()) {
            let message = `Starting Test: ${test.name}`;
            console.log(indent() + message);
            outputFunction(indent() + message);
            let ret = 0;
            let hadError = null;

            try {
                ret = test.fn.apply(this);
                if(typeof ret === "undefined") {
                    ret = 1;
                }
            }
            catch(e) { console.log(e); hadError = e; }

            let status = ` ... ${ret ? "Passed" : "Failed"} ${hadError ?"\r\n\r\n"+hadError+"\r\n\r\n"+hadError.stack+"\r\n":""}\r\n`;
            console.log(status);
            outputFunction(status);

            count += ret;
        }

        this.log(`${count} of ${total} tests passed\r\n`);
        this.logIndent(-1);
        return count;
    }

    get prototype() {
        return this.constructor.prototype;
    }
}

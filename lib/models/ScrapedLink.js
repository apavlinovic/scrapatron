"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScrapedBase_1 = require("./ScrapedBase");
class ScrapedLink extends ScrapedBase_1.default {
    constructor(url, title, alt, isInternal) {
        super(url, title, alt);
        this.IsInternal = isInternal || false;
    }
}
exports.default = ScrapedLink;

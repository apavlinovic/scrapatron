"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScrapedBase_1 = require("./ScrapedBase");
class ScrapedImage extends ScrapedBase_1.default {
    constructor(url, title, alt) {
        super(url, title, alt);
    }
}
exports.default = ScrapedImage;
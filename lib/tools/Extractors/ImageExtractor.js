"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("cheerio");
const url = require("url");
const ScrapedImage_1 = require("../../models/ScrapedImage");
function ExtractImages(html, baseUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const $html = $(html);
        const $images = $html.find('img');
        var images = [];
        $images.each((index, image) => {
            let $image = $(image);
            images.push(new ScrapedImage_1.default(url.resolve(baseUrl, $image.attr('src')), $image.attr('title') || $image.parent().attr('title'), $image.attr('alt')));
        });
        return images;
    });
}
;
exports.default = ExtractImages;

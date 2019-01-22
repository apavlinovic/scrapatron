"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("cheerio");
const url = require("url");
const ScrapedImage_1 = require("../../models/ScrapedImage");
async function ExtractImages(html, baseUrl) {
    const $html = $(html);
    const $images = $html.find('img');
    var images = [];
    $images.each((index, image) => {
        let $image = $(image);
        images.push(new ScrapedImage_1.default(url.resolve(baseUrl, $image.attr('src')), $image.attr('title') || $image.parent().attr('title'), $image.attr('alt')));
    });
    return images;
}
;
exports.default = ExtractImages;

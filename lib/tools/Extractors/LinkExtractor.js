"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("cheerio");
const url = require("url");
const ScrapedLink_1 = require("../../models/ScrapedLink");
async function ExtractLinks(html, baseUrl) {
    const $html = $(html);
    const $links = $html.find('a');
    const isInternal_RGX = new RegExp('^(http|https|ftp)://' + extractHostname(baseUrl), 'i');
    var links = [];
    $links.each((index, link) => {
        let $link = $(link);
        let _url = url.resolve(baseUrl, $link.attr('href'));
        let isInternal = isInternal_RGX.test(_url);
        links.push(new ScrapedLink_1.default(_url, isInternal));
    });
    return links;
}
;
function extractHostname(url) {
    var hostname;
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    return hostname;
}
exports.default = ExtractLinks;

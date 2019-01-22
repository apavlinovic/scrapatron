"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const ImageExtractor_1 = require("./Extractors/ImageExtractor");
const LinkExtractor_1 = require("./Extractors/LinkExtractor");
class Navigator {
    constructor() {
        this.Ready = false;
    }
    async Initialize(options) {
        this.Browser = await puppeteer.launch(options);
        this.Page = await this.Browser.newPage();
        this.Ready = true;
    }
    async NavigateTo(url, options) {
        this.CheckIfNavigatorIsReady();
        await this.Page.goto(url, options);
    }
    ;
    async GetPageMeta() {
        this.CheckIfNavigatorIsReady();
        let title = await this.Page.title();
        let url = this.Page.url();
        return new PageMeta(title, url);
    }
    ;
    async GetPageHtml() {
        this.CheckIfNavigatorIsReady();
        return await this.Page.content();
    }
    ;
    async ExtractImages() {
        let html = await this.GetPageHtml();
        let meta = await this.GetPageMeta();
        return await ImageExtractor_1.default(html, meta.Url);
    }
    ;
    async ExtractLinks() {
        let html = await this.GetPageHtml();
        let meta = await this.GetPageMeta();
        return await LinkExtractor_1.default(html, meta.Url);
    }
    ;
    CheckIfNavigatorIsReady() {
        if (!this.Browser && !this.Page) {
            throw "Navigator is not ready yet.";
        }
    }
}
exports.default = Navigator;
class PageMeta {
    constructor(title, url) {
        this.Title = title;
        this.Url = url;
    }
}

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
const puppeteer = require("puppeteer");
const ImageExtractor_1 = require("./Extractors/ImageExtractor");
const LinkExtractor_1 = require("./Extractors/LinkExtractor");
class Navigator {
    Initialize(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Browser = yield puppeteer.launch(options);
            this.Page = yield this.Browser.newPage();
        });
    }
    NavigateTo(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckIfNavigatorIsReady();
            yield this.Page.goto(url, options);
        });
    }
    ;
    GetPageMeta() {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckIfNavigatorIsReady();
            let title = yield this.Page.title();
            let url = this.Page.url();
            return new PageMeta(title, url);
        });
    }
    ;
    GetPageHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckIfNavigatorIsReady();
            return yield this.Page.content();
        });
    }
    ;
    ExtractImages() {
        return __awaiter(this, void 0, void 0, function* () {
            let html = yield this.GetPageHtml();
            let meta = yield this.GetPageMeta();
            return yield ImageExtractor_1.default(html, meta.Url);
        });
    }
    ;
    ExtractLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            let html = yield this.GetPageHtml();
            let meta = yield this.GetPageMeta();
            return yield LinkExtractor_1.default(html, meta.Url);
        });
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

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
const Navigator_1 = require("./Navigator");
const Downloader_1 = require("./Downloader");
class Scraper {
    constructor(downloadFolder) {
        this.Downloader = new Downloader_1.default(downloadFolder);
    }
    Scrape(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let navigator = new Navigator_1.default();
            console.log(`Warming up`);
            yield navigator.Initialize();
            yield navigator.NavigateTo(url);
            console.log(`Navigated to: ${url}`);
            let images = yield navigator.ExtractImages();
            console.log(`Images extracted: ${images.length} images found.`);
            let links = yield navigator.ExtractLinks();
            links = links.filter(l => l.IsInternal);
            console.log(`Links extracted: ${links.length} internal links found.`);
            for (const i of images) {
                console.log(`Downloading ${i.Url} (title: ${i.Title}, alt: ${i.Alt})`);
                var fileName = i.GetDownloadFriendlyName();
                yield this.Downloader.Download(i.Url);
                yield this.Downloader.SaveAs(fileName);
                console.log(`-> Saved as ${fileName}`);
            }
            console.log("Scraping is complete.");
            return links;
        });
    }
}
exports.default = Scraper;

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
const commander = require("commander");
const ScrapedImage_1 = require("./models/ScrapedImage");
const Downloader_1 = require("./tools/Downloader");
const Navigator_1 = require("./tools/Navigator");
commander
    .option('-u, --url <href>', 'Target URL that will be scraped')
    .version('0.0.1')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    commander.outputHelp();
}
else {
    (() => __awaiter(this, void 0, void 0, function* () {
        console.log(`Warming up`);
        const base = commander.url;
        const navigator = new Navigator_1.default();
        yield navigator.Initialize();
        console.log(`Warm up complete`);
        yield navigator.NavigateTo(base);
        console.log(`Navigate to: ${base}`);
        const html = yield navigator.GetPageHtml();
        console.log(`Fetch HTML: ${base}`);
        const $html = $(html);
        const $images = $html.find('img');
        var images = [];
        $images.each((index, image) => {
            let $image = $(image);
            images.push(new ScrapedImage_1.default(url.resolve(base, $image.attr('src')), $image.attr('title') || $image.parent('a').attr('title'), $image.attr('alt')));
        });
        var imageDownloader = new Downloader_1.default('./output');
        for (const i of images) {
            console.log(`Downloading ${i.Url}`);
            var fileName = i.GetDownloadFriendlyName();
            yield imageDownloader.Download(i.Url);
            yield imageDownloader.SaveAs(fileName);
            console.log(`-> Saved as ${fileName}`);
        }
        console.log("Scraping is complete.");
    }))();
}

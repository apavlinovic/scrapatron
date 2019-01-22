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
const commander = require("commander");
const Scraper_1 = require("./tools/Scraper");
const ScrapeQue_1 = require("./tools/ScrapeQue");
const ScrapedLink_1 = require("./models/ScrapedLink");
commander
    .option('-u, --url <href>', 'Target URL that will be scraped')
    .version('0.0.1')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    commander.outputHelp();
}
else {
    (() => __awaiter(this, void 0, void 0, function* () {
        const TARGET_URL = commander.url;
        const scraper = new Scraper_1.default('./output');
        const que = new ScrapeQue_1.default();
        que.AddToQue([new ScrapedLink_1.default(TARGET_URL)]);
        while (!que.IsFinished()) {
            var nextAvailableUrl = que.Next();
            if (nextAvailableUrl) {
                try {
                    var connected_urls = yield scraper.Scrape(nextAvailableUrl);
                    que.AddToQue(connected_urls);
                }
                catch (error) {
                    console.log("ERROR AT URL: " + nextAvailableUrl);
                }
                finally {
                    que.MarkAsComplete(nextAvailableUrl);
                }
            }
            console.log(que.Progress());
        }
    }))();
}

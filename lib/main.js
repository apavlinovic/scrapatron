"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const Scraper_1 = require("./tools/Scraper");
const ScrapeQue_1 = require("./tools/ScrapeQue");
const ScrapedLink_1 = require("./models/ScrapedLink");
const Downloader_1 = require("./tools/Downloader");
commander
    .option('-u, --url <href>', 'Target URL that will be scraped')
    .version('0.0.1')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    commander.outputHelp();
}
else {
    (async () => {
        const TARGET_URL = commander.url;
        const scraper = new Scraper_1.default();
        const link_que = new ScrapeQue_1.default();
        const download_que = new ScrapeQue_1.default();
        const downloader = new Downloader_1.default('./output');
        link_que.AddToQue([new ScrapedLink_1.default(TARGET_URL)]);
        while (!link_que.IsFinished()) {
            var nextAvailableUrl = link_que.Next();
            if (nextAvailableUrl) {
                try {
                    var result = await scraper.Scrape(nextAvailableUrl);
                    // link_que.AddToQue(result.ExtractedLinks);
                    download_que.AddToQue(result.ExtractImages);
                }
                catch (error) {
                    console.log("ERROR AT URL: " + nextAvailableUrl);
                }
                finally {
                    link_que.MarkAsComplete(nextAvailableUrl);
                }
            }
            console.log(link_que.Progress());
            console.log(`=======================`);
        }
        for (const item of download_que.ToArray()) {
            var i = item.Context;
            console.log(`Downloading ${i.Url} (title: ${i.Title}, alt: ${i.Alt})`);
            var fileName = i.GetDownloadFriendlyName();
            await downloader.Download(i.Url);
            await downloader.SaveAs(fileName);
            download_que.MarkAsComplete(item.Context.Url);
            console.log(`-> Saved as ${fileName}`);
            console.log(download_que.Progress());
        }
    })();
}

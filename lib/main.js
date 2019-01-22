"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const Scraper_1 = require("./tools/Scraper");
const ScrapeQue_1 = require("./tools/ScrapeQue");
const ScrapedLink_1 = require("./models/ScrapedLink");
const ScrapedImage_1 = require("./models/ScrapedImage");
const Downloader_1 = require("./tools/Downloader");
const colors = require("colors/safe");
commander
    .option('-u, --url <href>', 'Target URL that will be scraped')
    .option('-s, --shallow', 'Follow internal links or just scrape the provided URL')
    .option('-t, --titleOrAlt', 'Try to create a smarter image file name from related Title and Alt attributes')
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
                    if (!commander.shallow) {
                        link_que.AddToQue(result.ExtractedLinks);
                    }
                    download_que.AddToQue(result.ExtractImages);
                }
                catch (error) {
                    console.log(colors.red("ERROR AT URL: " + nextAvailableUrl));
                }
                finally {
                    link_que.MarkAsComplete(nextAvailableUrl);
                }
            }
            console.log(colors.blue(`Progress: ${link_que.Progress().Completed} / ${link_que.Progress().Total}`));
            console.log('');
        }
        console.log(`==============================================================================`);
        for (const item of download_que.ToArray()) {
            var i = item.Context;
            console.log(`Downloading ${i.Url} (title: ${i.Title}, alt: ${i.Alt})`);
            var fileName = i.GetDownloadFriendlyName();
            if (commander.titleOrAlt) {
                fileName = i.GetDownloadFriendlyName(ScrapedImage_1.NamingStrategy.TitleOrAlt);
            }
            await downloader.Download(i.Url);
            await downloader.SaveAs(fileName);
            download_que.MarkAsComplete(item.Context.Url);
            console.log(colors.green(`-> Saved as ${fileName}`));
            console.log(colors.blue(`Progress: ${download_que.Progress().Completed} / ${download_que.Progress().Total}`));
            console.log('');
        }
    })();
}

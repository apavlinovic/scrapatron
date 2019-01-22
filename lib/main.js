"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors/safe");
const commander = require("commander");
const Scraper_1 = require("./tools/Scraper");
const ScrapeQue_1 = require("./tools/ScrapeQue");
const Downloader_1 = require("./tools/Downloader");
const $ = require("cheerio");
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
        var result = await scraper.Scrape(TARGET_URL);
        result.ExtractedLinks = result.ExtractedLinks.filter(link => link.Url.indexOf('/hero') != -1);
        link_que.AddToQue(result.ExtractedLinks);
        while (!link_que.IsFinished()) {
            var nextAvailableUrl = link_que.Next();
            if (nextAvailableUrl) {
                try {
                    var result = await scraper.Scrape(nextAvailableUrl);
                    var $html = $(result.HTML);
                    let title = $html.find('.hero-name').text();
                    let heroclass = $html.find('.hero-mess-con .hero-zhiye:nth-child(1) .hero-wenan').text();
                    let widthHeight = $html.find('.hero-mess-con .hero-zhiye:nth-child(2) .hero-wenan').text();
                    let measurments = $html.find('.hero-mess-con .hero-zhiye:nth-child(3) .hero-wenan').text();
                    let appearance = $html.find('.hero-mess-con .hero-zhiye:nth-child(4) .hero-wenan').text();
                    let allegiance = $html.find('.hero-mess-con .hero-zhiye:nth-child(5) .hero-wenan').text();
                    let featured_img = $html.find('.hero-people-img img').attr('src');
                    let hero_story = $html.find('.hero-story .index_list_content div').text();
                    let hero_stats = $html.find('.hero-shuxing .index_list_content').html();
                    let hero_talent = [];
                    let hero_tree = [];
                    $html.find('.hero-tianfu li').each((i, element) => {
                        hero_talent.push({
                            img: $(element).find('img').attr('src'),
                            name: $(element).find('.hero-tianfu-txt p:first-child').text(),
                            description: $(element).find('.hero-tianfu-txt p:nth-child(2)').text(),
                        });
                    });
                    $html.find('.hero-list-zhuanzhi li').each((i, element) => {
                        hero_tree.push({
                            img: $(element).find('img').attr('src'),
                            name: $(element).find('span').text(),
                        });
                    });
                    console.log(title, heroclass, widthHeight, measurments, appearance, allegiance, featured_img, hero_story, hero_stats, hero_talent, hero_tree);
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
        /*
        while(!link_que.IsFinished()) {
            var nextAvailableUrl = link_que.Next();

            if(nextAvailableUrl) {
                try {
                    var result = await scraper.Scrape(nextAvailableUrl);
                    
                    if(!commander.shallow) {
                        link_que.AddToQue(result.ExtractedLinks);
                    }

                    download_que.AddToQue(result.ExtractImages);
                } catch (error) {
                    console.log(colors.red("ERROR AT URL: " + nextAvailableUrl));
                } finally {
                    link_que.MarkAsComplete(nextAvailableUrl);
                }
            }

            console.log(colors.blue(`Progress: ${ link_que.Progress().Completed } / ${ link_que.Progress().Total }`));
            console.log('')
        }

        console.log(`==============================================================================`);

        for (const item of download_que.ToArray()) {
            var i = item.Context as ScrapedImage;
            console.log(`Downloading ${ i.Url } (title: ${i.Title}, alt: ${ i.Alt })`);
            
            var fileName = i.GetDownloadFriendlyName();

            if(commander.titleOrAlt) {
                fileName = i.GetDownloadFriendlyName(NamingStrategy.TitleOrAlt);
            }
            
            await downloader.Download(i.Url);
            await downloader.SaveAs(fileName);

            download_que.MarkAsComplete(item.Context.Url);
            console.log(colors.green(`-> Saved as ${ fileName }`))
            console.log(colors.blue(`Progress: ${ download_que.Progress().Completed } / ${ download_que.Progress().Total }`));
            console.log('')
        }        */
    })();
}

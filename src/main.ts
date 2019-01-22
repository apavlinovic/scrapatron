import * as puppeteer from 'puppeteer';
import * as $ from 'cheerio';
import * as url from 'url';
import * as commander from 'commander';

import ScrapedImage from './models/ScrapedImage';
import Downloader from './tools/Downloader';


commander
.option('-u, --url <href>', 'Target URL that will be scraped')
.version('0.0.1')
.parse(process.argv);

if (!process.argv.slice(2).length) {

    commander.outputHelp();

}  else {
    
    (async () => {    
        
        console.log(`Warming up the parser`)
        const base = commander.url;

        console.log(base)

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.goto(base);
        const html = await page.content();
        
        const $html = $(html);
        const $images = $html.find('img');
        
        var images : Array<ScrapedImage> = [];
        
        $images.each((index, image) => {
            let $image = $(image);
            
            images.push(new ScrapedImage(
                url.resolve(base, $image.attr('src')),
                $image.attr('title') || $image.parent('a').attr('title'),
                $image.attr('alt')
                ));
            });
            
            var imageDownloader = new Downloader('./output');
            
            for (const i of images) {
                console.log(`Downloading ${ i.Url }`)

                var fileName = i.GetDownloadFriendlyName();
                await imageDownloader.Download(i.Url);
                await imageDownloader.SaveAs(fileName);

                console.log(`-> Saved as ${ fileName }`)
            }
            
            console.log("Scraping is complete.")
            
        })();
    }
    
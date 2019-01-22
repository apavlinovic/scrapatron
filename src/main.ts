import * as puppeteer from 'puppeteer';
import * as $ from 'cheerio';
import * as url from 'url';
import * as commander from 'commander';

import ScrapedImage from './models/ScrapedImage';
import Downloader from './tools/Downloader';
import Navigator from './tools/Navigator';


commander
.option('-u, --url <href>', 'Target URL that will be scraped')
.version('0.0.1')
.parse(process.argv);

if (!process.argv.slice(2).length) {
    
    commander.outputHelp();
    
}  else {
    
    (async () => {   
                
        console.log(`Warming up`);
        const base = commander.url;
        const navigator = new Navigator();

        await navigator.Initialize();
        console.log(`Warm up complete`);
        
        await navigator.NavigateTo(base);
        console.log(`Navigate to: ${ base }`);

        const html = await navigator.GetPageHtml();
        console.log(`Fetch HTML: ${ base }`);

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
            }
        );
            
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
    
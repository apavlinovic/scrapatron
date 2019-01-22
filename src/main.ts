import * as commander from 'commander';
import Scraper from './tools/Scraper';
import ScrapeQue from './tools/ScrapeQue';
import ScrapedLink from './models/ScrapedLink';
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
                
        const TARGET_URL = commander.url;
        const scraper = new Scraper();
        const link_que = new ScrapeQue();
        const download_que = new ScrapeQue();
        const downloader = new Downloader('./output');

        link_que.AddToQue([ new ScrapedLink(TARGET_URL) ]);

        while(!link_que.IsFinished()) {
            var nextAvailableUrl = link_que.Next();

            if(nextAvailableUrl) {
                try {
                    var result = await scraper.Scrape(nextAvailableUrl);
                    link_que.AddToQue(result.ExtractedLinks);
                    download_que.AddToQue(result.ExtractImages);
                } catch (error) {
                    console.log("ERROR AT URL: " + nextAvailableUrl);
                } finally {
                    link_que.MarkAsComplete(nextAvailableUrl);
                }
            }

            console.log(link_que.Progress());
            console.log(`=======================`);
        }

        for (const item of download_que.ToArray()) {
            var i = item.Context as ScrapedImage;
            console.log(`Downloading ${ i.Url } (title: ${i.Title}, alt: ${ i.Alt })`)
            
            var fileName = i.GetDownloadFriendlyName();
            await downloader.Download(i.Url);
            await downloader.SaveAs(fileName);

            download_que.MarkAsComplete(item.Context.Url);
            console.log(`-> Saved as ${ fileName }`)
            console.log(download_que.Progress());
        }        
    })();
}
    
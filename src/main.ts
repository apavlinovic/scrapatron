import * as commander from 'commander';
import Scraper from './tools/Scraper';
import ScrapeQue from './tools/ScrapeQue';
import ScrapedLink from './models/ScrapedLink';
import ScrapedImage, { NamingStrategy } from './models/ScrapedImage';
import Downloader from './tools/Downloader';
import * as colors from 'colors/safe';

commander
.option('-u, --url <href>', 'Target URL that will be scraped')
.option('-s, --shallow', 'Follow internal links or just scrape the provided URL')
.option('-t, --titleOrAlt', 'Try to create a smarter image file name from related Title and Alt attributes')
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
        }        
    })();
}
    
import * as commander from 'commander';
import Scraper from './tools/Scraper';
import ScrapeQue from './tools/ScrapeQue';
import ScrapedLink from './models/ScrapedLink';


commander
.option('-u, --url <href>', 'Target URL that will be scraped')
.version('0.0.1')
.parse(process.argv);

if (!process.argv.slice(2).length) {
    
    commander.outputHelp();
    
}  else {
    
    (async () => {   
                
        const TARGET_URL = commander.url;
        const scraper = new Scraper('./output');
        const link_que = new ScrapeQue();

        link_que.AddToQue([ new ScrapedLink(TARGET_URL) ]);

        while(!link_que.IsFinished()) {
            var nextAvailableUrl = link_que.Next();

            if(nextAvailableUrl) {
                try {
                    var connected_urls = await scraper.Scrape(nextAvailableUrl);
                    link_que.AddToQue(connected_urls);
                } catch (error) {
                    console.log("ERROR AT URL: " + nextAvailableUrl);
                } finally {
                    link_que.MarkAsComplete(nextAvailableUrl);
                }
            }

            console.log(link_que.Progress());
        }

    })();
}
    
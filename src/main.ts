import * as commander from 'commander';
import Scraper from './tools/Scraper';


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

        await scraper.Scrape(TARGET_URL);
    })();
}
    
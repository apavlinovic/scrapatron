import Navigator from './Navigator';
import Downloader from './Downloader';
import ScrapeQue from './ScrapeQue';

export default class Scraper {

    private Navigator: Navigator;

    constructor() {
        this.Navigator = new Navigator();
    }

    async WarmUp() {
        console.log(`Warming up`);
        console.log(`=======================`);
        await this.Navigator.Initialize();
    }

    async Scrape(
        url: string
    ) {
        if(!this.Navigator.Ready)
            await this.WarmUp();

        await this.Navigator.NavigateTo(url);
        console.log(`Navigated to: ${ url }`);
        
        let images = await this.Navigator.ExtractImages();
        console.log(`Images extracted: ${ images.length } images found.`);

        let links = await this.Navigator.ExtractLinks();
        links = links.filter(l => l.IsInternal);

        console.log(`Links extracted: ${ links.length } internal links found.`);

        console.log(`SCRAPED: ${ url }`)
        console.log(`=======================`);

        return {
            ExtractedLinks: links,
            ExtractImages: images
        };
    }


}
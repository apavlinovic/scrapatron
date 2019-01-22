import Navigator from './Navigator';
import Downloader from './Downloader';

export default class Scraper {

    private Downloader: Downloader;
    private ScrapeList: any;

    constructor(downloadFolder: string) {
        this.Downloader = new Downloader(downloadFolder);
        this.ScrapeList = {};
    }

    async Scrape(
        url: string
    ) {
        let navigator = new Navigator();

        console.log(`Warming up`);
        await navigator.Initialize();

        await navigator.NavigateTo(url);
        console.log(`Navigated to: ${ url }`);
        
        let images = await navigator.ExtractImages();
        console.log(`Images extracted: ${ images.length } images found.`);

        let links = await navigator.ExtractLinks();
        links = links.filter(l => l.IsInternal);

        console.log(`Links extracted: ${ links.length } internal links found.`);
        for (const i of images) {
            console.log(`Downloading ${ i.Url }`)
            
            var fileName = i.GetDownloadFriendlyName();
            await this.Downloader.Download(i.Url);
            await this.Downloader.SaveAs(fileName);
            
            console.log(`-> Saved as ${ fileName }`)
        }

        console.log("Scraping is complete.")
    }


}
import Navigator from './Navigator';
import Downloader from './Downloader';
import ScrapeQue from './ScrapeQue';

export default class Scraper {

    private Downloader: Downloader;
    private DownloadQue: ScrapeQue;

    constructor(downloadFolder: string) {
        this.Downloader = new Downloader(downloadFolder);
        this.DownloadQue = new ScrapeQue();
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
            console.log(`Downloading ${ i.Url } (title: ${i.Title}, alt: ${ i.Alt })`)
            
            var fileName = i.GetDownloadFriendlyName();
            await this.Downloader.Download(i.Url);
            await this.Downloader.SaveAs(fileName);
            
            console.log(`-> Saved as ${ fileName }`)
        }

        console.log("Scraping is complete.")
        return links;
    }


}
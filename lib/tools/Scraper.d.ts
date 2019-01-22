export default class Scraper {
    private Downloader;
    private ScrapeList;
    constructor(downloadFolder: string);
    Scrape(url: string): Promise<void>;
}

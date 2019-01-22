export default class Scraper {
    private Downloader;
    constructor(downloadFolder: string);
    Scrape(url: string): Promise<import("../models/ScrapedLink").default[]>;
}

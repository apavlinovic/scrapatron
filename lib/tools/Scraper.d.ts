export default class Scraper {
    private Navigator;
    constructor();
    WarmUp(): Promise<void>;
    Scrape(url: string): Promise<{
        ExtractedLinks: import("../models/ScrapedLink").default[];
        ExtractImages: import("../models/ScrapedImage").default[];
    }>;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Navigator_1 = require("./Navigator");
const colors = require("colors/safe");
class Scraper {
    constructor() {
        this.Navigator = new Navigator_1.default();
    }
    async WarmUp() {
        console.log(colors.rainbow(`Warming up`));
        await this.Navigator.Initialize();
    }
    async Scrape(url) {
        if (!this.Navigator.Ready)
            await this.WarmUp();
        await this.Navigator.NavigateTo(url);
        console.log(colors.yellow(`Navigated to: ${url}`));
        let images = await this.Navigator.ExtractImages();
        let links = await this.Navigator.ExtractLinks();
        let html = await this.Navigator.GetPageHtml();
        links = links.filter(l => l.IsInternal);
        console.log(colors.green(`=> SCRAPED: ${url}`));
        console.log(`=> ${images.length} images found. ${links.length} internal links found.`);
        return {
            ExtractedLinks: links,
            ExtractImages: images,
            HTML: html
        };
    }
}
exports.default = Scraper;

import Navigator from './Navigator';
import * as colors from 'colors/safe';
export default class Scraper {

    private Navigator: Navigator;

    constructor() {
        this.Navigator = new Navigator();
    }

    async WarmUp() {
        console.log(colors.rainbow(`Warming up`));
        await this.Navigator.Initialize();
    }

    async Scrape(
        url: string
    ) {
        if(!this.Navigator.Ready)
            await this.WarmUp();

        await this.Navigator.NavigateTo(url);
        console.log(colors.yellow(`Navigated to: ${ url }`));
        
        let images = await this.Navigator.ExtractImages();

        let links = await this.Navigator.ExtractLinks();
        links = links.filter(l => l.IsInternal);

        console.log(colors.green(`=> SCRAPED: ${ url }`))
        console.log(`=> ${ images.length } images found. ${ links.length } internal links found.`);

        return {
            ExtractedLinks: links,
            ExtractImages: images
        };
    }


}
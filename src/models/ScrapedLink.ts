import ScrapedBase from "./ScrapedBase";

export default class ScrapedLink extends ScrapedBase {
    constructor(url: string, title?: string, alt?: string) {
        super(url, title, alt);
    }
}
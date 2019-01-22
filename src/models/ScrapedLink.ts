import ScrapedBase from "./ScrapedBase";

export default class ScrapedLink extends ScrapedBase {
    IsInternal: boolean;

    constructor(url: string, title?: string, alt?: string, isInternal?: boolean) {
        super(url, title, alt);

        this.IsInternal = isInternal || false;
    }
}
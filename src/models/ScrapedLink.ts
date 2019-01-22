import ScrapedBase from "./ScrapedBase";

export default class ScrapedLink extends ScrapedBase {
    IsInternal: boolean;

    constructor(url: string, isInternal?: boolean) {
        super(url);

        this.IsInternal = isInternal || false;
    }
}
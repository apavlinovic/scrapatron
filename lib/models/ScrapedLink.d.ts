import ScrapedBase from "./ScrapedBase";
export default class ScrapedLink extends ScrapedBase {
    IsInternal: boolean;
    constructor(url: string, title?: string, alt?: string, isInternal?: boolean);
}

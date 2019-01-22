import ScrapedImage from "../models/ScrapedImage";
import ScrapedLink from "../models/ScrapedLink";
export default class ScrapeQue {
    List: IQueItem;
    constructor();
    AddToQue(links: Array<ScrapedImage | ScrapedLink>): void;
    Next(): string | undefined;
    Progress(): {
        Total: number;
        Completed: number;
        Pending: number;
    };
    ToArray(): Item[];
    MarkAsComplete(url: string): void;
    IsFinished(): boolean;
}
interface IQueItem {
    [key: string]: Item;
}
declare class Item {
    Complete: boolean;
    Context: ScrapedImage | ScrapedLink;
    constructor(context: ScrapedImage | ScrapedLink);
}
export {};

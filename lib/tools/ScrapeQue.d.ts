import ScrapedLink from "../models/ScrapedLink";
export default class ScrapeQue {
    List: any;
    constructor();
    AddToQue(links: Array<ScrapedLink>): void;
    Next(): string | undefined;
    Progress(): {
        Total: number;
        Completed: number;
        Pending: number;
    };
    MarkAsComplete(url: string): void;
    IsFinished(): boolean;
}

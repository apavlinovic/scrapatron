import ScrapedImage from "../models/ScrapedImage";
import ScrapedLink from "../models/ScrapedLink";

export default class ScrapeQue {

    List: IQueItem;

    constructor() {
        this.List = {};
    }

    AddToQue(links: Array<ScrapedImage | ScrapedLink>) {
        links.forEach(l => {
            if(!this.List[l.Url]) {
                this.List[l.Url] = new Item(l);
            }
        })
    }

    Next() {
        for (const url in this.List) {
            if (this.List.hasOwnProperty(url)) {
                if(!this.List[url].Complete) {
                    return url;
                }
            }
        }
    }

    Progress() {
        let incomplete = 0;
        let complete = 0;

        for (const url in this.List) {
            if (this.List.hasOwnProperty(url)) {
                if(!this.List[url].Complete) {
                    incomplete++;
                } else {
                    complete++;
                }
            }
        }

        return {
            Total: complete + incomplete,
            Completed: complete,
            Pending: incomplete
        }
    }

    ToArray() {
        return Object.values(this.List);
    }
    
    MarkAsComplete(url: string) {
        this.List[url].Complete = true;
    }

    IsFinished() {
        for (const url in this.List) {
            if (this.List.hasOwnProperty(url)) {
                if(!this.List[url].Complete) {
                    return false;
                }
            }
        }

        return true;
    }
}

interface IQueItem {
    [key: string]: Item
}

class Item {
    Complete: boolean;
    Context: ScrapedImage | ScrapedLink;

    constructor(context: ScrapedImage | ScrapedLink) {
        this.Complete = false;
        this.Context = context;        
    }
}
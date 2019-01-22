import ScrapedLink from "../models/ScrapedLink";

export default class ScrapeQue {

    List: any;

    constructor() {
        this.List = {};
    }

    AddToQue(links: Array<ScrapedLink>) {
        links.forEach(l => {
            if(!this.List[l.Url]) {
                this.List[l.Url] = false;
            }
        })
    }

    Next() {
        for (const url in this.List) {
            if (this.List.hasOwnProperty(url)) {
                if(this.List[url] == false) {
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
                if(this.List[url] == false) {
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
    
    MarkAsComplete(url: string) {
        this.List[url] = true;
    }

    IsFinished() {
        for (const url in this.List) {
            if (this.List.hasOwnProperty(url)) {
                if(this.List[url] == false) {
                    return false;
                }
            }
        }

        return true;
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScrapeQue {
    constructor() {
        this.List = {};
    }
    AddToQue(links) {
        links.forEach(l => {
            if (!this.List[l.Url]) {
                this.List[l.Url] = new Item(l);
            }
        });
    }
    Next() {
        for (const url in this.List) {
            if (this.List.hasOwnProperty(url)) {
                if (!this.List[url].Complete) {
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
                if (!this.List[url].Complete) {
                    incomplete++;
                }
                else {
                    complete++;
                }
            }
        }
        return {
            Total: complete + incomplete,
            Completed: complete,
            Pending: incomplete
        };
    }
    ToArray() {
        return Object.values(this.List);
    }
    MarkAsComplete(url) {
        this.List[url].Complete = true;
    }
    IsFinished() {
        for (const url in this.List) {
            if (this.List.hasOwnProperty(url)) {
                if (!this.List[url].Complete) {
                    return false;
                }
            }
        }
        return true;
    }
}
exports.default = ScrapeQue;
class Item {
    constructor(context) {
        this.Complete = false;
        this.Context = context;
    }
}

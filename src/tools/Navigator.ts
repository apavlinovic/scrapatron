import * as puppeteer from 'puppeteer';

export default class Navigator {
    
    Browser!: puppeteer.Browser;
    Page!: puppeteer.Page;

    async Initialize(options?: puppeteer.LaunchOptions) {
        this.Browser = await puppeteer.launch(options);
        this.Page = await this.Browser.newPage();
    }

    async NavigateTo(url: string, options?: puppeteer.DirectNavigationOptions) {

        if(!this.Browser && !this.Page) {
            throw "Navigator is not ready yet.";
        }

        if(this.Page) {
            await this.Page.goto(url, options)
        }
    };

    async GetPageMeta() {
        if(!this.Browser && !this.Page) {
            throw "Navigator is not ready yet.";
        }

        let title = await this.Page.title();
        let url = this.Page.url();

        return new PageMeta(title, url);
    };

    async GetPageHtml() {
        if(!this.Browser && !this.Page) {
            throw "Navigator is not ready yet.";
        }

        return await this.Page.content();
    };

}

class PageMeta {
    Title: string;
    Url: string;

    constructor(title: string, url: string) {
        this.Title = title;    
        this.Url = url;
    }
}
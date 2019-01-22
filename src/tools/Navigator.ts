import * as puppeteer from 'puppeteer';
import ExtractImages from './Extractors/ImageExtractor';
import ExtractLinks from './Extractors/LinkExtractor';
export default class Navigator {
    
    Browser!: puppeteer.Browser;
    Page!: puppeteer.Page;
    Ready: boolean;

    constructor() {
        this.Ready = false;        
    }

    async Initialize(options?: puppeteer.LaunchOptions) {
        this.Browser = await puppeteer.launch(options);
        this.Page = await this.Browser.newPage();
        this.Ready = true;
    }

    async NavigateTo(url: string, options?: puppeteer.DirectNavigationOptions) {
        this.CheckIfNavigatorIsReady();

        await this.Page.goto(url, options)
    };

    async GetPageMeta() {
        this.CheckIfNavigatorIsReady();

        let title = await this.Page.title();
        let url = this.Page.url();

        return new PageMeta(title, url);
    };

    async GetPageHtml() {
        this.CheckIfNavigatorIsReady();

        return await this.Page.content();
    };

    async ExtractImages() {
        let html = await this.GetPageHtml();
        let meta = await this.GetPageMeta();

        return await ExtractImages(html, meta.Url);
    };

    async ExtractLinks() {
        let html = await this.GetPageHtml();
        let meta = await this.GetPageMeta();

        return await ExtractLinks(html, meta.Url);
    };    

    private CheckIfNavigatorIsReady() {
        if(!this.Browser && !this.Page) {
            throw "Navigator is not ready yet.";
        }
    }
}

class PageMeta {
    Title: string;
    Url: string;

    constructor(title: string, url: string) {
        this.Title = title;    
        this.Url = url;
    }
}
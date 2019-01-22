import * as puppeteer from 'puppeteer';
export default class Navigator {
    Browser: puppeteer.Browser;
    Page: puppeteer.Page;
    Ready: boolean;
    constructor();
    Initialize(options?: puppeteer.LaunchOptions): Promise<void>;
    NavigateTo(url: string, options?: puppeteer.DirectNavigationOptions): Promise<void>;
    GetPageMeta(): Promise<PageMeta>;
    GetPageHtml(): Promise<string>;
    ExtractImages(): Promise<import("../models/ScrapedImage").default[]>;
    ExtractLinks(): Promise<import("../models/ScrapedLink").default[]>;
    private CheckIfNavigatorIsReady;
}
declare class PageMeta {
    Title: string;
    Url: string;
    constructor(title: string, url: string);
}
export {};

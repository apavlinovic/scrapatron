import * as puppeteer from 'puppeteer';
export default class Navigator {
    Browser: puppeteer.Browser;
    Page: puppeteer.Page;
    Initialize(options?: puppeteer.LaunchOptions): Promise<void>;
    NavigateTo(url: string, options?: puppeteer.DirectNavigationOptions): Promise<void>;
    GetPageMeta(): Promise<PageMeta>;
    GetPageHtml(): Promise<string>;
}
declare class PageMeta {
    Title: string;
    Url: string;
    constructor(title: string, url: string);
}
export {};

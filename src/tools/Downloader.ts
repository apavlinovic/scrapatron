import fetch, { Response } from 'node-fetch';
import * as fs from 'fs';

export default class Downloader {
    SaveTo: string;
    Response: Response;

    private DefaultDownloadProtocol = 'http:';

    constructor(saveTo: string) {
        this.SaveTo = saveTo;
        this.Response = new Response();
    }

    async Download(url: string, ) {
        if(url.startsWith('//')) {
            url = `${ this.DefaultDownloadProtocol }${ url }`;
        } else if(!(url.startsWith('http://') || url.startsWith('https://'))) {
            url = `${ this.DefaultDownloadProtocol }//${ url }`;
        };

        this.Response = await fetch(url);
    }

    async SaveAs(filename: string) {
        const destination = await fs.createWriteStream(this.buildDestinationPathname(filename), {
            flags: 'w'
        });

        this.Response.body.pipe(destination);
    }

    private buildDestinationPathname(filename: string) {
        return `${ this.SaveTo }/${filename}`;
    }
}
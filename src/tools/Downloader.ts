import fetch, { Response } from 'node-fetch';
import * as fs from 'fs';

export default class Downloader {
    private DownloadFolder: string;
    private Response: Response;
    private DefaultDownloadProtocol = 'http:';

    constructor(downloadFolderPath: string) {
        this.DownloadFolder = downloadFolderPath;
        this.Response = new Response();
    }

    SetDownloadFolder(downloadFolderPath: string) {
        this.DownloadFolder = downloadFolderPath;
    }

    async Download(url: string) {
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
        return `${ this.DownloadFolder }/${filename}`;
    }
}
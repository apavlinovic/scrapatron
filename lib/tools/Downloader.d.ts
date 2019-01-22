import { Response } from 'node-fetch';
export default class Downloader {
    SaveTo: string;
    Response: Response;
    private DefaultDownloadProtocol;
    constructor(saveTo: string);
    Download(url: string): Promise<void>;
    SaveAs(filename: string): Promise<void>;
    private buildDestinationPathname;
}

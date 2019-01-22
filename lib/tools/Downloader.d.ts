export default class Downloader {
    private DownloadFolder;
    private Response;
    private DefaultDownloadProtocol;
    constructor(downloadFolderPath: string);
    SetDownloadFolder(downloadFolderPath: string): void;
    Download(url: string): Promise<void>;
    SaveAs(filename: string): Promise<void>;
    private buildDestinationPathname;
}

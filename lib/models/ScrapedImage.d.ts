import ScrapedBase from "./ScrapedBase";
export default class ScrapedImage extends ScrapedBase {
    Name: string | undefined;
    Extension: string | undefined;
    Alt: string | undefined;
    Title: string | undefined;
    constructor(url: string, title?: string, alt?: string);
    GetDownloadFriendlyName(): string;
    private GetFilenameFromUri;
    private GetFileNameFromTitle;
    private GetFilenameFromAlt;
    private SanitizeString;
}

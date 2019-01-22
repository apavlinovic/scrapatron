export default class ScrapedBase {
    Url: string;
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

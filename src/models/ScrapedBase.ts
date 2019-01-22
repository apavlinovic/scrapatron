export default class ScrapedBase {
    Url: string;
    Extension: string | undefined;
    Alt: string | undefined;
    Title: string | undefined;
    
    constructor(url: string, title?: string, alt?: string) {
        this.Url = url;
        this.Alt = alt || undefined;
        this.Title = title || undefined;

        var filenameParts = this.GetFilenameFromUri().split('.');
        this.Extension = filenameParts[filenameParts.length - 1];
    }

    GetDownloadFriendlyName() : string {

        if(this.Alt || this.Title) {
            var fileName = this.GetFileNameFromTitle() || this.GetFilenameFromAlt();
            var result = this.Extension ? `${ fileName }.${ this.Extension }` : fileName;

            return result as string;
        }

        return this.GetFilenameFromUri();
    }


    private GetFilenameFromUri() {
        return this.Url.substring(this.Url.lastIndexOf('/') + 1);
    }

    private GetFileNameFromTitle() {
        if(!this.Title)
            return null;

        return this.SanitizeString(this.Title);
    }

    private GetFilenameFromAlt() {
        if(!this.Alt)
            return null;

        return this.SanitizeString(this.Alt);
    }

    private SanitizeString(input: string) {
        return input.toLowerCase().replace(/[^\w\s-_]/gi, '').replace(/\s+/g, '-').replace('--', '-')
    }
}
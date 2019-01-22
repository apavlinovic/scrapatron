import ScrapedBase from "./ScrapedBase";

export default class ScrapedImage extends ScrapedBase {
    Name: string | undefined;
    Extension: string | undefined;
    Alt: string | undefined;
    Title: string | undefined;

    constructor(url: string, title?: string, alt?: string) {
        super(url);

        this.Alt = alt || undefined;
        this.Title = title || undefined;

        var filenameParts = this.GetFilenameFromUri().split('.');
        
        this.Name = filenameParts[0];        
        this.Extension = filenameParts[filenameParts.length - 1];        
    }


    GetDownloadFriendlyName(namingStrategy: NamingStrategy = NamingStrategy.FilenameOnly) : string {

        var filenameFromUri = this.GetFilenameFromUri();

        if(namingStrategy == NamingStrategy.TitleOrAlt && (this.Alt || this.Title)) 
        {
            console.log("Using alt or title...")
            var fileName = this.GetFileNameFromTitle() || this.GetFilenameFromAlt();
            var result = this.Extension 
                            ? `${ fileName }-${ this.Name }.${ this.Extension }` 
                            : `${ fileName }-${ this.Name }` ;

            return result as string;
        }

        return filenameFromUri;
    }


    private GetFilenameFromUri() {
        var fileName = this.Url.substring(this.Url.lastIndexOf('/') + 1);
        var queryStringIndex = fileName.indexOf('?');

        if(queryStringIndex != -1) {
            fileName = fileName.slice(0, queryStringIndex);
        }

        return fileName;
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

        return input.toLowerCase().replace(/[^\w\s-_]/gi, '').replace(/\s+/g, '-').replace(/-{2,}/g, '-')
    }    
}

export enum NamingStrategy {
    TitleOrAlt = 1,
    FilenameOnly = 2
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScrapedBase {
    constructor(url, title, alt) {
        this.Url = url;
        this.Alt = alt || undefined;
        this.Title = title || undefined;
        var filenameParts = this.GetFilenameFromUri().split('.');
        this.Extension = filenameParts[filenameParts.length - 1];
    }
    GetDownloadFriendlyName() {
        if (this.Alt || this.Title) {
            var fileName = this.GetFileNameFromTitle() || this.GetFilenameFromAlt();
            var result = this.Extension ? `${fileName}.${this.Extension}` : fileName;
            return result;
        }
        return this.GetFilenameFromUri();
    }
    GetFilenameFromUri() {
        return this.Url.substring(this.Url.lastIndexOf('/') + 1);
    }
    GetFileNameFromTitle() {
        if (!this.Title)
            return null;
        return this.SanitizeString(this.Title);
    }
    GetFilenameFromAlt() {
        if (!this.Alt)
            return null;
        return this.SanitizeString(this.Alt);
    }
    SanitizeString(input) {
        return input.toLowerCase().replace(/[^\w\s-_]/gi, '').replace(/\s+/g, '-').replace('--', '-');
    }
}
exports.default = ScrapedBase;

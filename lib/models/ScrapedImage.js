"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScrapedBase_1 = require("./ScrapedBase");
class ScrapedImage extends ScrapedBase_1.default {
    constructor(url, title, alt) {
        super(url);
        this.Alt = alt || undefined;
        this.Title = title || undefined;
        var filenameParts = this.GetFilenameFromUri().split('.');
        this.Name = this.SanitizeString(filenameParts[0]);
        this.Extension = filenameParts[filenameParts.length - 1];
    }
    GetDownloadFriendlyName(namingStrategy = NamingStrategy.FilenameOnly) {
        var filenameFromUri = this.GetFilenameFromUri();
        if (namingStrategy == NamingStrategy.TitleOrAlt && (this.Alt || this.Title)) {
            console.log("Using alt or title...");
            var fileName = this.GetFileNameFromTitle() || this.GetFilenameFromAlt();
            var result = this.Extension
                ? `${fileName}-${this.Name}.${this.Extension}`
                : `${fileName}-${this.Name}`;
            return result;
        }
        return filenameFromUri;
    }
    GetFilenameFromUri() {
        var fileName = this.Url.substring(this.Url.lastIndexOf('/') + 1);
        var queryStringIndex = fileName.indexOf('?');
        if (queryStringIndex != -1) {
            fileName = fileName.slice(0, queryStringIndex);
        }
        return fileName;
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
        return input.toLowerCase().replace(/[^\w\s-_]/gi, '').replace(/\s+/g, '-').replace(/-{2,}/g, '-');
    }
}
exports.default = ScrapedImage;
var NamingStrategy;
(function (NamingStrategy) {
    NamingStrategy[NamingStrategy["TitleOrAlt"] = 1] = "TitleOrAlt";
    NamingStrategy[NamingStrategy["FilenameOnly"] = 2] = "FilenameOnly";
})(NamingStrategy = exports.NamingStrategy || (exports.NamingStrategy = {}));

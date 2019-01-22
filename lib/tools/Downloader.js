"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const fs = require("fs");
class Downloader {
    constructor(downloadFolderPath) {
        this.DefaultDownloadProtocol = 'http:';
        this.DownloadFolder = downloadFolderPath;
        this.Response = new node_fetch_1.Response();
    }
    SetDownloadFolder(downloadFolderPath) {
        this.DownloadFolder = downloadFolderPath;
    }
    async Download(url) {
        if (url.startsWith('//')) {
            url = `${this.DefaultDownloadProtocol}${url}`;
        }
        else if (!(url.startsWith('http://') || url.startsWith('https://'))) {
            url = `${this.DefaultDownloadProtocol}//${url}`;
        }
        ;
        this.Response = await node_fetch_1.default(url);
    }
    async SaveAs(filename) {
        const destination = await fs.createWriteStream(this.buildDestinationPathname(filename), {
            flags: 'w'
        });
        this.Response.body.pipe(destination);
    }
    buildDestinationPathname(filename) {
        return `${this.DownloadFolder}/${filename}`;
    }
}
exports.default = Downloader;

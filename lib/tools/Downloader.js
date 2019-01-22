"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    Download(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (url.startsWith('//')) {
                url = `${this.DefaultDownloadProtocol}${url}`;
            }
            else if (!(url.startsWith('http://') || url.startsWith('https://'))) {
                url = `${this.DefaultDownloadProtocol}//${url}`;
            }
            ;
            this.Response = yield node_fetch_1.default(url);
        });
    }
    SaveAs(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const destination = yield fs.createWriteStream(this.buildDestinationPathname(filename), {
                flags: 'w'
            });
            this.Response.body.pipe(destination);
        });
    }
    buildDestinationPathname(filename) {
        return `${this.DownloadFolder}/${filename}`;
    }
}
exports.default = Downloader;

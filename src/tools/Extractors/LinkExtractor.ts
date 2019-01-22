import * as $ from 'cheerio';
import * as url from 'url';
import ScrapedLink from '../../models/ScrapedLink';


async function ExtractLinks(html: string, baseUrl: string) {
    const $html = $(html);
    const $links = $html.find('a');
    const isInternal_RGX = new RegExp('^(http|https|ftp)://' + extractHostname(baseUrl), 'i');

    var links : Array<ScrapedLink> = [];
    
    $links.each((index, link) => {
        let $link = $(link);
        let _url = url.resolve(baseUrl, $link.attr('href'));
        let isInternal = isInternal_RGX.test(_url);

        links.push(
            new ScrapedLink(
                _url,
                isInternal
            )
        );
    });

    return links;    
};

function extractHostname(url: string) {
    var hostname;

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

export default ExtractLinks;
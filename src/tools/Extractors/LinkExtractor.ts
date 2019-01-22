import * as $ from 'cheerio';
import * as url from 'url';
import ScrapedLink from '../../models/ScrapedLink';


async function ExtractLinks(html: string, baseUrl: string) {
    const $html = $(html);
    const $links = $html.find('a');
    const isInternal_RGX = new RegExp('^' + baseUrl, 'i');

    var links : Array<ScrapedLink> = [];
    
    $links.each((index, link) => {
        let $link = $(link);
        let _url = url.resolve(baseUrl, $link.attr('href'));
        let isInternal = isInternal_RGX.test(_url);

        links.push(
            new ScrapedLink(
                _url,
                $link.attr('title'),
                $link.attr('alt'),
                isInternal
            )
        );
    });

    return links;
};

export default ExtractLinks;
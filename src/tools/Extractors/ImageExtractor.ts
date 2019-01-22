import * as $ from 'cheerio';
import * as url from 'url';

import ScrapedImage from "../../models/ScrapedImage";

async function ExtractImages(html: string, baseUrl: string) {
    const $html = $(html);
    const $images = $html.find('img');
    
    var images : Array<ScrapedImage> = [];
    
    $images.each((index, image) => {
        let $image = $(image);
        
        images.push(
            new ScrapedImage(
                url.resolve(baseUrl, $image.attr('src')),
                $image.attr('title'),
                $image.attr('alt')
            )
        );
    });

    return images;
};

export default ExtractImages;
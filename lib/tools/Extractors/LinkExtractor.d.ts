import ScrapedLink from '../../models/ScrapedLink';
declare function ExtractLinks(html: string, baseUrl: string): Promise<ScrapedLink[]>;
export default ExtractLinks;

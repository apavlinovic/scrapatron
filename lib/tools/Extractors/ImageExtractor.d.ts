import ScrapedImage from "../../models/ScrapedImage";
declare function ExtractImages(html: string, baseUrl: string): Promise<ScrapedImage[]>;
export default ExtractImages;

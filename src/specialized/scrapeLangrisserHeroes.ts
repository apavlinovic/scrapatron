import * as colors from 'colors/safe';
import * as commander from 'commander';
import * as $ from 'cheerio';
import * as fs from 'fs';

import Scraper from '../tools/Scraper';
import ScrapeQue from '../tools/ScrapeQue';

commander
.option('-u, --url <href>', 'Target URL that will be scraped')
.option('-s, --shallow', 'Follow internal links or just scrape the provided URL')
.option('-t, --titleOrAlt', 'Try to create a smarter image file name from related Title and Alt attributes')
.version('0.0.1')
.parse(process.argv);

if (!process.argv.slice(2).length) {
    
    commander.outputHelp();
    
}  else {
    
    (async () => {   
                
        const TARGET_URL = commander.url;
        const scraper = new Scraper();
        const link_que = new ScrapeQue();
        
        var result = await scraper.Scrape(TARGET_URL);
        result.ExtractedLinks = result.ExtractedLinks.filter(link => link.Url.indexOf('/hero') != -1);
        
        link_que.AddToQue(result.ExtractedLinks);

        var heroes = [];

        while(!link_que.IsFinished()) {
            var nextAvailableUrl = link_que.Next();

            if(nextAvailableUrl) {
                try {
                    var result = await scraper.Scrape(nextAvailableUrl);
                    var $html = $(result.HTML);

                    function getFilenameFromUri(url: string) {
                        return url.substring(url.lastIndexOf('/') + 1)
                    }

                    let title = $html.find('.hero-name').text();
                    let heroclass = $html.find('.hero-mess-con .hero-zhiye:nth-child(1) .hero-wenan').text();
                    let widthHeight = $html.find('.hero-mess-con .hero-zhiye:nth-child(2) .hero-wenan').text();
                    let measurments = $html.find('.hero-mess-con .hero-zhiye:nth-child(3) .hero-wenan').text();
                    let appearance = $html.find('.hero-mess-con .hero-zhiye:nth-child(4) .hero-wenan').text();
                    let allegiance = $html.find('.hero-mess-con .hero-zhiye:nth-child(5) .hero-wenan').text();
                    let featured_img = getFilenameFromUri($html.find('.hero-people-img img').attr('src'));
                    let hero_story = $html.find('.hero-story .index_list_content div').text();
                    let hero_talent : Array<any> = [];
                    let hero_tree : Array<any> = [];
                    let hero_tree_effects : Array<any> = [];
                    let hero_stats = {
                        HP: 0,
                        INT: 0,
                        MDEF: 0,
                        ATK: 0,
                        DEF: 0,
                        SKILL: 0
                    };

                    let $stat_table = $html.find('.hero-shuxing .index_list_content table');
                    hero_stats.HP = parseInt($stat_table.find('tr:nth-child(1) td:nth-child(2)').text());
                    hero_stats.ATK = parseInt($stat_table.find('tr:nth-child(1) td:nth-child(4)').text());
                    hero_stats.INT = parseInt($stat_table.find('tr:nth-child(2) td:nth-child(2)').text());
                    hero_stats.DEF = parseInt($stat_table.find('tr:nth-child(2) td:nth-child(4)').text());
                    hero_stats.MDEF = parseInt($stat_table.find('tr:nth-child(3) td:nth-child(2)').text());
                    hero_stats.SKILL = parseInt($stat_table.find('tr:nth-child(3) td:nth-child(4)').text());

                    $html.find('.hero-tianfu li').each((i, element) => {
                        hero_talent.push({
                            img: getFilenameFromUri($(element).find('img').attr('src')),
                            name: $(element).find('.hero-tianfu-txt p:first-child').text(),
                            description: $(element).find('.hero-tianfu-txt p:nth-child(2)').text(),
                        })
                    });

                    $html.find('.hero-list-zhuanzhi li').each((i, element) => {
                        hero_tree.push({
                            img: getFilenameFromUri($(element).find('img').attr('src')),
                            name: $(element).find('span').text(),
                        })
                    });


                    $html.find('.newsList').each((i, element) => {
                        var effects = {
                            soldiers: new Array(),
                            skills: new Array()
                        };

                            let soldiers = $(element).find('.hero-dapei .index_list_content li');

                            soldiers.each((i, soldier) => {
                                let $stat_table = $(soldier).find('.hero-tianfu-txt');
                                let hero_stats = {
                                    HP: 0,
                                    MDEF: 0,
                                    ATK: 0,
                                    DEF: 0,
                                    SKILL: ''
                                };


                                hero_stats.HP = parseInt($stat_table.find('tr:nth-child(1) td:nth-child(2)').text());
                                hero_stats.ATK = parseInt($stat_table.find('tr:nth-child(1) td:nth-child(4)').text());
                                hero_stats.DEF = parseInt($stat_table.find('tr:nth-child(2) td:nth-child(2)').text());
                                hero_stats.MDEF = parseInt($stat_table.find('tr:nth-child(2) td:nth-child(4)').text());
                                hero_stats.SKILL = $stat_table.find('tr:nth-child(3) td:nth-child(1)').text();

                                effects.soldiers.push({
                                    img: getFilenameFromUri($(soldier).find('img').attr('src')),
                                    name: $(soldier).find('img + span').text(),
                                    stats: hero_stats
                                })
                            })


                            let skills = $(element).find('.hero-jineng .index_list_content li');

                            skills.each((i, skill) => {
                                effects.skills.push({
                                    img: getFilenameFromUri($(skill).find('img').attr('src')),
                                    name: $(skill).find('.hero-tianfu-txt p:nth-child(1)').text(),
                                    description: $(skill).find('.hero-tianfu-txt p:nth-child(2)').html()
                                })
                            })

                        hero_tree_effects.push(effects);
                    });                    

                    heroes.push({
                        name: title, 
                        class: heroclass, 
                        width: widthHeight.split('/')[0], 
                        height: widthHeight.split('/')[1], 
                        measurments, 
                        appearance, 
                        allegiance, 
                        featured_img, 
                        hero_story, 
                        hero_stats, 
                        hero_talent, 
                        hero_tree, 
                        hero_tree_effects
                    });


                } catch (error) {
                    console.log(colors.red("ERROR AT URL: " + nextAvailableUrl));
                } finally {
                    link_que.MarkAsComplete(nextAvailableUrl);
                }
            }

            console.log(colors.blue(`Progress: ${ link_que.Progress().Completed } / ${ link_que.Progress().Total }`));
            console.log('')
        }            

        
        fs.writeFileSync('./langrisser-heroes.json', JSON.stringify(heroes), {
            flag: 'w+'
        });
    })();
}
    
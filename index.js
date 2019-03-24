var rp = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var chalk = require('chalk');


rp.get('https://www.indeed.com/jobs?q=software+developer&l=11790&start=0')
    .then((body) => {
        data = [];
        let $ = cheerio.load(body);
        $(".jobsearch-SerpJobCard").map((index, node) => {
            let link = "https://www.indeed.com/viewjob?jk=".concat($(node).attr('data-jk'));
            let title = $(node).find('a').attr('title').trim();
            let companyName = $(node).find('span.company').text().trim();
            let location = $(node).find('div.location').text().trim();
            let summary = $(node).find('div.paddedSummary').text().trim();
            let job = {link, title, companyName, location, summary};
            //console.log(chalk.red(data.companyName), chalk.default.green(JSON.stringify(data.link)));
            data.push(job);
        });
        console.log(data.length);
        return data;
    })
    .then((data) => {
        
    })
    .catch(err => console.log(err));
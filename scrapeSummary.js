var rp = require('request-promise');
var cheerio = require('cheerio');
var chalk = require('chalk');


const scrapeSummaries = (zipCode, pos) => {
    return new Promise((resolve, reject) => {
            rp.get(`https://www.indeed.com/jobs?q=software+developer&l=${zipCode}&start=${pos}`)
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
                console.log(chalk.red(job.companyName), chalk.default.green(JSON.stringify(job.link)));
                data.push(job);
            });
            console.log(data.length);
            resolve(data);
        });
    });
};

module.exports = scrapeSummaries;
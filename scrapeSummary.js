var rp = require('request-promise');
var cheerio = require('cheerio');
var chalk = require('chalk');


const scrapeSummaries = (zipCode, pos, jobTitle) => {
    return new Promise((resolve, reject) => {
            console.log(chalk.default.yellowBright(`https://www.indeed.com/jobs?q=${jobTitle}&l=${zipCode}&start=${pos}`))
            rp.get(`https://www.indeed.com/jobs?q=${jobTitle}&l=${zipCode}&start=${pos}`)
        .then((body) => {
            data = [];
            let $ = cheerio.load(body);
            $(".jobsearch-SerpJobCard").map((index, node) => {
                let link = "https://www.indeed.com/viewjob?jk=".concat($(node).attr('data-jk'));
                let title = $(node).find('a').attr('title').trim();
                let companyName = $(node).find('span.company').text().trim();
                let location = $(node).find('div.location').text().trim();
                let summary = $(node).find('div.paddedSummary').text().trim();
                let salary = $(node).find('span.salary').text().trim();
                let job = {link, title, companyName, location, summary, salary};
                console.log(chalk.red(job.companyName), chalk.default.green(job.salary));
                data.push(job);
            });
            console.log(data.length);
            resolve(data);
        }).catch(err => reject(err));
    });
};

module.exports = scrapeSummaries;
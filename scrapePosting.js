var cheerio = require('cheerio');
var chalk = require('chalk');
var rp = require('request-promise');

const scrapePosting = (link) => {
    console.log(chalk.default.blueBright(link));
    return new Promise((resolve, reject) => {
        rp.get(link)
        .then(body => {
            let $ = cheerio.load(body);
            let posting = {};
            $('.jobsearch-JobComponent-description').find('ul').map((index, node) => {
                let key = $(node).prev().text().trim();
                let value = $(node).text();
                let obj = {};
                obj[key] = value;
                posting = Object.assign(posting, obj);
                //console.log(chalk.default.grey(key),chalk.default.greenBright(value));
            });
            resolve(posting);  
        }).catch(err => reject(err));
    });
};

module.exports = scrapePosting;
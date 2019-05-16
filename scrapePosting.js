var cheerio = require('cheerio');
var chalk = require('chalk');
var rp = require('request-promise');
var config = require('./config.json');

const scrapePosting = (link) => {
    console.log(chalk.default.blueBright(link));
    return new Promise((resolve, reject) => {
        rp.get(link)
        .then(body => {
            let $ = cheerio.load(body);
            let posting = {};
            let val = $('.jobsearch-JobComponent-description').text().toLowerCase().trim();
            config.terms.map(term => {
                let exp = new RegExp(term, 'g');
                let expObj = {};
                expObj[term] = exp.test(val) ? 1 : 0;
                posting = Object.assign(posting, expObj);
            });
            console.log(chalk.default.red(link), chalk.default.grey(JSON.stringify(posting, null, 2)));
            resolve(posting);  
        }).catch(err => reject(err));
    });
};

module.exports = scrapePosting;
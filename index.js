var chalk = require('chalk');
var scrapeSummary = require('./scrapeSummary');
var scrapePosting = require('./scrapePosting');
var config = require('./config.json');

const main = async function() {
    let dataSet = [];
    let postingDataSet = [];
    let title = config.jobtitle.split(" ").join("+");
    for (let index = 0; index < config.results; index++) {
        let data = await scrapeSummary(config.zipCode, index*10, title);
        dataSet.push(data);
    }
    dataSet.forEach(data => {
        data.forEach(async (jobSummary) => {
            let posting = await scrapePosting(jobSummary.link);
            posting = Object.assign(posting, {Title : jobSummary.title, CompanyName : jobSummary.companyName, Salary : jobSummary.salary, Location : jobSummary.location})
            postingDataSet.push(posting);
        });
    });
    return postingDataSet;
};

main();

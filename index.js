var chalk = require('chalk');
var json2csv = require('json2csv');
var fs = require('fs');
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
    for(let index = 0; index < dataSet.length; index++) {
        for(let jndex = 0; jndex < dataSet[index].length; jndex++) {
            let posting = await scrapePosting(dataSet[index][jndex].link);
            posting = Object.assign(posting, {Title : dataSet[index][jndex].title, CompanyName : dataSet[index][jndex].companyName, Salary : dataSet[index][jndex].salary, Location : dataSet[index][jndex].location});
            postingDataSet.push(posting);
        }
    }
    return postingDataSet;
};

main().then(res => {
    fields=["java", 
    "sql", 
    "python",
    "c\\+\\+",
    "c\\#", 
    "html",
    "css", 
    "javascript|js",
    "php",
    "react",
    "angular",
    "ember",
    "erlang",
    "go",
    "django",
    "rails",
    "hadoop",
    "spark",
    "postgresql",
    "elastic",
    "neo4j",
    ".net",
    "asp.net",
    "vb.net",
    "xml",
    "json",
    "unix",
    "linux",
    "jquery",
    "ruby",
    "mongodb",
    "aws",
    "j2ee",
    "node.js",
    "scala",
    "kotlin",
    "perl",
    "redis",
    "express",
    "git",
    "android",
    "swift",
    "spring",
    "Title", 
    "CompanyName",
    "Salary",
    "Location" 
    ]
    let csv = json2csv.parse(res, {fields});
    return csv
}).then(csv => {
    fs.writeFile(`${config.zipCode}.csv`, csv, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
});

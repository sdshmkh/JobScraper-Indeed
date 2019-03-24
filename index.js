var scrapeSummary = require('./scrapeSummary');

const main = async function() {
    let data = await scrapeSummary(11790, 0);
    console.log(data);
};

main();
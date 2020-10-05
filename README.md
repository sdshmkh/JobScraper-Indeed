# JobScraper-Indeed
Web scraper for scraping jobs from Indeed.com for Research 2k19 using Cheerio Js.

## Code
`index.js` is th entry point fro the app which will begin scraping jobs. This is where the data is pulled from indeed.com and compiled into a CSV.

### `scrapePosting.js`
This file contains the logic to pull data from the job posting card. This includes some preliminary information such the link to complete posting.

### `scrapeSummary.js`
This scrapes the summary of the job. This is the meaty textual part which includes the skillsets and other information about a job posting.

### `Indeed-job-data.ipynb`
This file contains the analysis of the data that we compiled into a CSV format in `index.js`

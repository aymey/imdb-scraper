# imdb-scraper
scrapes imdb using omdb api

## how to use it
1. enter your api key in the `apiKey` constant located at [`scraper.js`](https://github.com/aymey/imdb-scraper/blob/main/scraper.js#L4)
2. enter movie titles to `movie` file located at `.` delimited by a newline character
3. run with `node scraper.js`

## dependencies
Aswell as obviously depending on Node, imdb-scraper depends on `axios` and file system (`fs`): use `npm install axios`.

# imdb-scraper
scrapes imdb using omdb api

## how to use it
1. enter your api key in the `apiKey` constant located at [`scraper.js`](https://github.com/aymey/imdb-scraper/blob/main/scraper.js#L4)
2. enter approximate movie titles to `movie` file located at `.` delimited by a newline character
3. run with `node scraper.js`
4. watch as it fills `output.tsv` with all fields from omdb in the default order in tsv format

I suggest going into [`scraper.js`](https://github.com/aymey/imdb-scraper/blob/main/scraper.js) and removing the unneeded fields because it uses all available fields by default

## dependencies
Aswell as obviously depending on Node, imdb-scraper depends on `axios` and file system (`fs`): use `npm install axios` to install.

## Example / Showcase
verbose scraper cli output vs official omdb example json output:
![scraper](http://i.ibb.co/pXQ3BTT/image.png) ![omdb](http://i.ibb.co/WGcFnXQ/image.png)

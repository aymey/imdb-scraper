const axios = require('axios');
const fs = require('fs').promises;

const apiKey = 'key here pleaseeee!'

async function searchMoviesByTitle(title) {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

async function getMovieById(imdbID) {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

async function main() {
  try {
    const fileContent = await fs.readFile('movies', 'utf-8');
    const movieTitles = fileContent.split('\n').filter(title => title.trim() !== '');

    if (movieTitles.length === 0) {
      console.log('No movie titles found in the file.');
      return;
    }

    for (const movieTitle of movieTitles) {
      console.log(`Searching for: ${movieTitle}`);
      const searchResult = await searchMoviesByTitle(movieTitle);

      if (searchResult && searchResult.Search) {
        for (const movie of searchResult.Search) {
          try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
            const movieDetails = response.data;

            // thanks https://readthedocs.org/projects/omdbpy/downloads/pdf/latest/
            let delim = '	', data = movieDetails.Title + delim + movieDetails.Year + delim + movieDetails.Type + delim + movieDetails.Actors + delim + movieDetails.Awards + delim + movieDetails.Country + delim + movieDetails.Director + delim + movieDetails.Genre + delim + movieDetails.Episode + delim + movieDetails.Season + delim + movieDetails.SeriesID + delim + movieDetails.Language + delim + movieDetails.Metascore + delim + movieDetails.Plot + delim + movieDetails.Poster + delim + movieDetails.Rated + delim + movieDetails.Ratings + delim + movieDetails.Released + delim + movieDetails.Runtime + delim + movieDetails.Writer + delim + movieDetails.imdbID + delim + movieDetails.imdbRating + delim + movieDetails.imdbVotes + delim + movieDetails.BoxOffice + delim + movieDetails.DVD + delim + movieDetails.Production + delim + movieDetails.Website + delim + movieDetails.tomatoConsensus + delim + movieDetails.tomatoFresh + delim + movieDetails.tomatoImage + delim + movieDetails.tomatoMeter + delim + movieDetails.tomatoRating + delim + movieDetails.tomatoReviews + delim + movieDetails.tomatoRotten + delim + movieDetails.tomatoUserMeter + delim + movieDetails.tomatoUserRating + delim + movieDetails.tomatoUserReviews + '\n'// dumb way but whatever
            fs.appendFile('output.tsv', data, 'utf8', (e) => {
              e ? console.error('Error writing to the file:', err) : console.log(`Data for "${movie}" has been written to output successfully.`);
            });
            console.log(`successfully written for ${movieTitle}: ${movie}\n-----------------------`);
          } catch (error) {
            console.error('Error fetching movie details:', error.message);
          }
        }
      } else {
        console.log(`No results found for "${movieTitle}".`);
      }
    }
  } catch (error) {
    console.error('Error reading the file:', error.message);
  }
}

main();

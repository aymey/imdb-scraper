const axios = require('axios');
const fs = require('fs').promises;

const apiKey = ' OMDB key here pleaseeee!'

async function getMovieById(imdbID) {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    if (response.data.Error) {
      console.error('Error fetching movie details:', response.data.Error);
      return null;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

async function main() {
  try {
    const fileContent = await fs.readFile('movies', 'utf-8');
    const movieIDs = fileContent.split('\n').filter(id => id.trim() !== '');

    if (movieIDs.length === 0) {
      console.log('No IMDb IDs found in the file.');
      return;
    }

    for (const imdbID of movieIDs) {
      console.log(`Fetching details for IMDB ID: ${imdbID}`);
      const movieDetails = await getMovieById(imdbID);
      if (movieDetails) {
        // thanks https://readthedocs.org/projects/omdbpy/downloads/pdf/latest/
        let delim = '	', data = movieDetails.Title + delim + movieDetails.Year + delim + movieDetails.Type + delim + movieDetails.Actors + delim + movieDetails.Awards + delim + movieDetails.Country + delim + movieDetails.Director + delim + movieDetails.Genre + delim + movieDetails.Episode + delim + movieDetails.Season + delim + movieDetails.SeriesID + delim + movieDetails.Language + delim + movieDetails.Metascore + delim + movieDetails.Plot + delim + movieDetails.Poster + delim + movieDetails.Rated + delim + movieDetails.Ratings + delim + movieDetails.Released + delim + movieDetails.Runtime + delim + movieDetails.Writer + delim + movieDetails.imdbID + delim + movieDetails.imdbRating + delim + movieDetails.imdbVotes + delim + movieDetails.BoxOffice + delim + movieDetails.DVD + delim + movieDetails.Production + delim + movieDetails.Website + delim + movieDetails.tomatoConsensus + delim + movieDetails.tomatoFresh + delim + movieDetails.tomatoImage + delim + movieDetails.tomatoMeter + delim + movieDetails.tomatoRating + delim + movieDetails.tomatoReviews + delim + movieDetails.tomatoRotten + delim + movieDetails.tomatoUserMeter + delim + movieDetails.tomatoUserRating + delim + movieDetails.tomatoUserReviews + '\n'// dumb way but whatever
        fs.appendFile('output.tsv', data, 'utf8', (e) => {
          e ? console.error('Error writing to the file:', err) : console.log(`Data for "${movie}" has been written to output successfully.`);
        });
        console.log(`successfully written for ${movieIDs}: ${imdbID}\n-----------------------`);
      } else {
        console.log(`No results found for IMDb ID "${imdbID}".`);
      }
    }
  } catch (error) {
    console.error('Error reading the file:', error.message);
  }
}

main();

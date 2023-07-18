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
          console.log(`Title: ${movie.Title}`);
          console.log(`Year: ${movie.Year}`);
          console.log(`IMDb ID: ${movie.imdbID}`);
          console.log('-----------------------');
          try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
            const movieDetails = response.data;
            console.log(`Genre: ${movieDetails.Genre || 'N/A'}`);
            console.log(`IMDb Rating: ${movieDetails.imdbRating || 'N/A'}`);
            console.log(`Actors: ${movieDetails.Actors || 'N/A'}`);
            console.log(`Director: ${movieDetails.Director || 'N/A'}`);
            console.log(`Producer: ${movieDetails.Production || 'N/A'}`);
            console.log('-----------------------');
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

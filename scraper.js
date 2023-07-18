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
            // thanks https://readthedocs.org/projects/omdbpy/downloads/pdf/latest/
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
            const movieDetails = response.data;
            console.log(`Title: ${movieDetails.Title}`)
            console.log(`Year: ${movieDetails.Year}`)
            console.log(`Type: ${movieDetails.Type}`)
            console.log(`Actors: ${movieDetails.Actors}`)
            console.log(`Awards: ${movieDetails.Awards}`)
            console.log(`Country: ${movieDetails.Country}`)
            console.log(`Director: ${movieDetails.Director}`)
            console.log(`Genre: ${movieDetails.Genre}`)
            console.log(`Episode: ${movieDetails.Episode}`)
            console.log(`Season: ${movieDetails.Season}`)
            console.log(`SeriesID: ${movieDetails.SeriesID}`)
            console.log(`Language: ${movieDetails.Language}`)
            console.log(`Metascore: ${movieDetails.Metascore}`)
            console.log(`Plot: ${movieDetails.Plot}`)
            console.log(`Poster: ${movieDetails.Poster}`)
            console.log(`Rated: ${movieDetails.Rated}`)
            console.log(`Ratings: ${movieDetails.Ratings}`)
            console.log(`Released: ${movieDetails.Released}`)
            console.log(`Runtime: ${movieDetails.Runtime}`)
            console.log(`Writer: ${movieDetails.Writer}`)
            console.log(`imdbID: ${movieDetails.imdbID}`)
            console.log(`imdbRating: ${movieDetails.imdbRating}`)
            console.log(`imdbVotes: ${movieDetails.imdbVotes}`)
            console.log(`BoxOffice: ${movieDetails.BoxOffice}`)
            console.log(`DVD: ${movieDetails.DVD}`)
            console.log(`Production: ${movieDetails.Production}`)
            console.log(`Website: ${movieDetails.Website}`)
            console.log(`tomatoConsensus: ${movieDetails.tomatoConsensus}`)
            console.log(`tomatoFresh: ${movieDetails.tomatoFresh}`)
            console.log(`tomatoImage: ${movieDetails.tomatoImage}`)
            console.log(`tomatoMeter: ${movieDetails.tomatoMeter}`)
            console.log(`tomatoRating: ${movieDetails.tomatoRating}`)
            console.log(`tomatoReviews: ${movieDetails.tomatoReviews}`)
            console.log(`tomatoRotten: ${movieDetails.tomatoRotten}`)
            console.log(`tomatoUserMeter: ${movieDetails.tomatoUserMeter}`)
            console.log(`tomatoUserRating: ${movieDetails.tomatoUserRating}`)
            console.log(`tomatoUserReviews: ${movieDetails.tomatoUserReviews}`)
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

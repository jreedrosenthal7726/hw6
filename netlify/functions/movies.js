// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out


  // 🔥 hw6: your recipe and code starts here!
 
  let year = event.queryStringParameters.year
  console.log(year)
  let genre = event.queryStringParameters.genre

  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies:[]
    }
    for (let i=0; i < moviesFromCsv.length; i++) {
      let movie = moviesFromCsv[i]
      if (movie.genres != `//N` || movie.runtimeMinutes != '//N') {
      if (movie.genres == genre && movie.startYear == year){
      let postObject = {
        title: movie.originalTitle,
        releaseDate: movie.startYear,
        movieGenre: movie.genres
      }
      returnValue.movies.push(postObject)
      returnValue.numResults = returnValue.numResults + 1
      }
    }
    }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(returnValue) // a string of data
    }
  }
}

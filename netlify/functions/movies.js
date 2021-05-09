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
  // console.log(year)
  let genre = event.queryStringParameters.genre

  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }
  }
  // an else if statement that returns an error if a user does not submit a year and genre
  else if (year.length < 1 || genre.length <1 ){
    return{      
    statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    body: `Error: Must Provide Year and Genre` // a string of data
   }
  }
  //set up else statement that creates desired API
  //Create empty list that will eventually receive number of results and list of movies
  else {
    let returnValue = {
      numResults: 0,
      movies:[]
    }
  //create for loop that goes through the CSV doc
    for (let i=0; i < moviesFromCsv.length; i++) {
      let movie = moviesFromCsv[i]
  //create conditional that removes any movie without a genre or run time
      if (movie.genres != `//N` || movie.runtimeMinutes != '//N') {
  // create a conditional that forces user to input a genre and year   
      if (movie.genres == genre && movie.startYear == year){
  //make object containing information that is required
        let postObject = {
        title: movie.originalTitle,
        releaseDate: movie.startYear,
        movieGenre: movie.genres
      }
    //add object to empty movie list
      returnValue.movies.push(postObject)
    //make number of results feed up to the object
      returnValue.numResults = returnValue.numResults + 1
      }
    }
    }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    //output is stringed version of the return value above
      body: JSON.stringify(returnValue) // a string of data
    }
  }
}

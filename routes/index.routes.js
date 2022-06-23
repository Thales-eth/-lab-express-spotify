const router = require("express").Router();

const SpotifyWebApi = require('spotify-web-api-node');

// SPOTIFY STUFF
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

// RUTAS
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");

});

router.get("/artist-search", (req, res, next) => {


  const { favArtist } = req.query

  spotifyApi
    .searchArtists(favArtist)
    .then(data => {
      const dataStream = data.body.artists.items
      // console.log('The received data from the API: ', dataStream);
      // console.log(dataStream[0].images[0].url)
      res.render('artist-search-results.hbs', { dataStream })
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));


});

router.get("/albums/:artistId", (req, res, next) => {
  const { artistId } = req.params
  console.log(artistId)
  // res.send('HOLA HERMOSO')
  // res.render("albums");
  spotifyApi
    .getArtistAlbums(artistId)
    .then(data => {
      const dataAlbum = data.body.items
      res.render('albums.hbs', { dataAlbum })
      // console.log(data)
    })


});

router.get("/viewtracks/:trackId", (req, res, next) => {
  const { trackId } = req.params
  console.log(trackId)
  res.send('HOLA HERMOSO')
  // res.render("albums");
  spotifyApi
    .getArtistAlbums(artistId)
    .then(data => {
      const dataAlbum = data.body.items
      res.render('albums.hbs', { dataAlbum })
      // console.log(data)
    })


});

module.exports = router;


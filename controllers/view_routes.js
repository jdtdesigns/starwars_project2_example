const router = require('express').Router();
const { Favorite } = require('../models');
const axios = require('axios');

// Show the homepage
router.get('/', async (req, res) => {
  res.render('index');
});

// Show the add favorite page
router.get('/search', (req, res) => {
  res.render('search');
});

// Show the search results page
router.post('/search', async (req, res) => {
  const search = req.body.search;
  const baseURL = 'https://swapi.dev/api/people';

  const response = await axios.get(`${baseURL}?search=${search}`);
  let characters = response.data.results;
  const favs = await Favorite.findAll();

  characters = characters.map(char => {
    const faved = favs.find(f => f.character_name === char.name);

    return {
      ...char,
      favorited: faved ? true : false
    }
  });

  res.render('results', { characters: characters });
});

// Store favorite route
router.post('/favorite', async (req, res) => {
  await Favorite.create(req.body);

  res.redirect('/favorites');
})

// Show the search page
router.get('/favorites', async (req, res) => {
  const favs = await Favorite.findAll({
    raw: true
  });

  res.render('favorites', { favs: favs });
});

router.post('/remove/:fav_id', async (req, res) => {
  await Favorite.destroy({
    where: {
      id: req.params.fav_id
    }
  });

  res.redirect('/favorites');
})


module.exports = router;
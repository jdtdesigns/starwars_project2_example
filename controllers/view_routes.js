const router = require('express').Router();
const { Favorite, User } = require('../models');
const axios = require('axios');

function authenticate(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  next();
}

// Show the homepage
router.get('/', async (req, res) => {
  if (req.user) {
    return res.redirect('/favorites');
  }

  res.render('index', {
    homepage: true
  });
});

// Show the search page
router.get('/search', authenticate, async (req, res) => {
  const user = await User.findByPk(req.session.user);

  res.render('search', {
    user: { email: user.email },
    isSearch: true
  });
});

// Show the search results page
router.post('/search', async (req, res) => {
  const search = req.body.search;
  const baseURL = 'https://swapi.dev/api/people';

  const response = await axios.get(`${baseURL}?search=${search}`);
  const user = await User.findOne({
    include: Favorite,
    where: {
      id: req.session.user
    }
  });
  const favs = user.favorites;
  let characters = response.data.results;

  characters = characters.map(char => {
    const faved = favs.find(f => f.character_name === char.name);

    return {
      ...char,
      favorited: faved ? true : false
    }
  });

  res.render('results', {
    characters,
    user: {
      email: user.email
    }
  });
});

// Save a favorite
router.post('/favorite', authenticate, async (req, res) => {
  const user = await User.findByPk(req.session.user);

  await user.createFavorite(req.body);

  res.redirect('/favorites');
})

// Show the favorites page
router.get('/favorites', authenticate, async (req, res) => {
  let user = await User.findOne({
    include: Favorite,
    where: {
      id: req.session.user
    }
  });

  let favs = user.favorites.length && user.favorites;

  res.render('favorites', {
    favs,
    user: {
      email: user.email
    },
    isFavorites: true
  });
});

// Remove favorite
router.post('/remove/:fav_id', async (req, res) => {
  await Favorite.destroy({
    where: {
      id: req.params.fav_id
    }
  });

  res.redirect('/favorites');
})


module.exports = router;
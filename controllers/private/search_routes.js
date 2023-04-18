const router = require('express').Router();
const { isAuthenticated } = require('../helpers');
const { Favorite, User } = require('../../models');
const axios = require('axios');

/** VIEW ROUTES **/
// Show the search page
router.get('/search', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user);

  res.render('search', {
    user: { email: user.email },
    isSearch: true
  });
});

/** FORM ROUTES **/
// Search route to show the search results page
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

module.exports = router;
const router = require('express').Router();
const { Favorite, User } = require('../../models');
const { isAuthenticated } = require('../helpers');

/** VIEW ROUTES **/
// Show the favorites page
router.get('/favorites', isAuthenticated, async (req, res) => {
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

/** FORM ROUTES **/
// Save a favorite
router.post('/favorite', async (req, res) => {
  const user = await User.findByPk(req.session.user);

  await user.createFavorite(req.body);

  res.redirect('/favorites');
});

// Remove favorite
router.post('/remove/:fav_id', async (req, res) => {
  await Favorite.destroy({
    where: {
      id: req.params.fav_id
    }
  });

  res.redirect('/favorites');
});

module.exports = router;
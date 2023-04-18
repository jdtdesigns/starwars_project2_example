const router = require('express').Router();

// Show the homepage
router.get('/', async (req, res) => {
  if (req.user) {
    return res.redirect('/favorites');
  }

  res.render('index', {
    homepage: true
  });
});

module.exports = router;
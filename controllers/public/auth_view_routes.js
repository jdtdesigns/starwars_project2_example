const router = require('express').Router();

// Login View
router.get('/login', (req, res) => {
  if (req.user) {
    return res.redirect('/favorites');
  }

  res.render('auth/login', {
    auth_error: req.session.auth_error,
    isLogin: true
  });
});

// Register View
router.get('/register', (req, res) => {
  if (req.user) return res.redirect('/favorites');

  res.render('auth/register', { auth_error: req.session.auth_error });
});

module.exports = router;
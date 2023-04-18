const router = require('express').Router();
const { User } = require('../models');

// Login View
router.get('/auth/login', (req, res) => {
  if (req.user) {
    return res.redirect('/favorites');
  }

  res.render('auth/login', {
    auth_error: req.session.auth_error,
    isLogin: true
  });
});

// Log user in
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email
    }
  });

  if (!user) {
    req.session.auth_error = ['No account found with that email. Please register.'];
    return res.redirect('/auth/register');
  };

  const valid_pass = await user.validatePass(password);

  if (!valid_pass) {
    req.session.auth_error = ['Your password is incorrect. Please try again.'];
    return res.redirect('/auth/login');
  };

  req.session.user = user.id;
  delete req.session.auth_error;
  res.redirect('/favorites');
});

// Register View
router.get('/auth/register', (req, res) => {
  if (req.user) return res.redirect('/favorites');

  res.render('auth/register', { auth_error: req.session.auth_error });
});

// Register User
router.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    req.session.user = user.id;
    delete req.session.auth_error;

    res.redirect('/favorites');
  } catch (err) {
    req.session.auth_error = err.errors.map(e => e.message);
    res.redirect('/auth/register');
  }
});

// Logout User
router.get('/auth/logout', (req, res) => {
  req.session.destroy();

  res.redirect('/');
});

module.exports = router;

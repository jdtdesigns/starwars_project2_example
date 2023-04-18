const router = require('express').Router();
const { User } = require('../../models');

// Log user in
router.post('/login', async (req, res) => {
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

// Register User
router.post('/register', async (req, res) => {
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
router.get('/logout', (req, res) => {
  req.session.destroy();

  res.redirect('/');
});

module.exports = router;
const router = require('express').Router();
const { Course } = require('../models');

router.get('/', async (req, res) => {
  // Render Index Template and pass it a userName value with a student name
  const courses = await Course.findAll({
    raw: true
  });

  res.render('index', { courses });
});


module.exports = router;
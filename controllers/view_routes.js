const router = require('express').Router();
const { Course, Student, Tutor } = require('../models');

router.get('/', async (req, res) => {
  let courses = await Course.findAll({
    include: Student
  });

  // courses = [...courses];

  res.render('index', {
    userName: 'JD',
    courses: courses
  });
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
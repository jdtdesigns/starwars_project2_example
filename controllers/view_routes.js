const router = require('express').Router();
const { Course } = require('../models');

router.get('/', async (req, res) => {
  // Render Index Template and pass it a userName value with a student name

  // Get all courses, using the Course model and send the courses array to the index template
  const courses = await Course.findAll({
    raw: true
  });

  res.render('index', {
    courses: courses
  });
});

router.post('/courses', async (req, res) => {
  const course_data = req.body;
  await Course.create(course_data);

  res.redirect('/');
});


module.exports = router;
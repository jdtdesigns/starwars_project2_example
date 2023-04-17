const router = require('express').Router();
const { Course, Student, Tutor } = require('../models');

// Course Routes
router.get('/courses', async (req, res) => {
  const courses = await Course.findAll({
    include: Student
  });

  res.send(courses);
});

router.post('/courses', async (req, res) => {
  const course_data = req.body;

  const new_course = await Course.create(course_data);

  res.send(new_course);
});


// Student Routes
router.get('/students', async (req, res) => {
  const students = await Student.findAll({
    include: [Course, Tutor]
  });

  res.send(students);
});

router.post('/students', async (req, res) => {
  const student_data = req.body;

  const new_student = await Student.create({
    first_name: student_data.first_name,
    last_name: student_data.last_name,
    courseId: student_data.course_id
  });

  // const course = await Course.findByPk(student_data.course_id);

  // const new_student = await course.createStudent({
  //   first_name: student_data.first_name,
  //   last_name: student_data.last_name
  // });

  res.send(new_student);
});

// Tutor Routes
router.get('/tutors', async (req, res) => {
  const tutors = await Tutor.findAll({
    include: Student
  });

  res.send(tutors);
});

router.post('/tutors', async (req, res) => {
  const tutor_data = req.body;

  const new_tutor = await Tutor.create(tutor_data);

  res.send(new_tutor);
});

// Add student to tutor roster
router.put('/tutors/:tutor_id', async (req, res) => {
  const student_data = req.body;

  const tutor = await Tutor.findByPk(req.params.tutor_id);
  const student = await Student.findByPk(student_data.student_id);

  await tutor.addStudent(student);

  res.send('Student added to tutor roster successfully!');
});

module.exports = router;
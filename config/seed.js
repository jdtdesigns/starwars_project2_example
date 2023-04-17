const Course = require('../models/Course');
const db = require('./connection');

db.sync({ force: true }).then(() => {
  Course.bulkCreate([
    {
      title: 'Fullstack Web Dev'
    },
    {
      title: 'Data Visualization'
    },
    {
      title: 'UXUI'
    }
  ]).then(() => {
    console.log('Courses seeded!');
    process.exit();
  });
});


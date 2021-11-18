const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/courses', (req, res) => {
  var courses = readCourses();
  console.log(courses);
  return res.end(courses);
});

app.post('/courses', (req, res) => {
  res.sendStatus(200);
  createCourse(req.query.title);
});

app.put('/courses/:id', function (req, res) {
  var course = getCourseById(req.body.todo.id); //using helper function to get the course
  if (course) {
    editcourse(req.body.course.id, req.body.course);
    res.send('ok');
  } else {
    res.status(400).send('course not found');
  }
});

// update function
// I have no experience in NODE whatsoever so after long search and trials and errors with copy and paste I decided to write it the way I can to show you the logic I'd use if I knew the syntax. I not I should use .put but I failed in all attempts, so:

// const addCoursePage = (courseId, pageTitle) => {
//   const coursesArray = readCourses();
//   const requiredCourse = coursesArray.filter(
//     (course) => course._id === courseId
//   );
//   const newCourse = {
//     ...requiredCourse,
//     pages: { ...requiredCourse.pages,
//      },
//   };
// };

// const fs = require('fs')
// fs.writeFile('/path/to/file', '', function(){console.log('done')})

// app.put('/courses', (req, res) => {
//   const courses = readCourses();
//     const requestedCourse = courses.filter(course => course)
// });

app.listen(3000);

const Handlebars = require('handlebars');
const fs = require('fs');
const dataHandler = require('./src/dataHandler');
var templateData = {};

const courseTemplate = fs.readFile('./src/templates/course.hbs', (e, data) => {
  if (e) {
    console.error(e);
  }
  templateData.course = Handlebars.compile(data.toString('utf-8'));
});

function readCourses() {
  const data = dataHandler.getData();
  var courseMarkup = '';
  for (var i = 0; i < data.courses.length; i++) {
    courseMarkup += templateData.course(data.courses[i]);
  }
  return courseMarkup;
}
function createCourse(title) {
  var newCourse = {
    _id: 'course' + Math.random(),
    title: title,
  };
  dataHandler.appendCourse(newCourse);
}

const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/courses', (req, res) => {
  var courses = readCourses();
  return res.end(courses);
});

app.post('/courses', (req, res) => {
  res.sendStatus(200);
  createCourse(req.query.title);
});

// update function

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

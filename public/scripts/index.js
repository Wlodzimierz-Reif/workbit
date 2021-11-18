// not needed anymore

// $(() => {
//   console.log('loaded');
// });

change;
function getCourses() {
  fetch(window.origin + '/courses')
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      $('#course-container').html(data);
    })
    .then(() => {
      animateTitles();
    });
}

// we can rewrite it using async await

// const getCourses = async () => {
//   let response = await fetch(window.origin + '/courses');
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   let responseText = await response.text();
//   await $('#course-container').html(responseText);
//   await animateTitles();
// };

function addCourse() {
  fetch(window.origin + '/courses?title=' + new Date().toTimeString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
  })
    .then((res) => {
      console.log(res);
      return res.text();
    })
    .then((data) => {
      getCourses();
    });
}

const animateTitles = () => {
  console.log('animate');
  $('.course-title').fadeIn(1000); //it's so slow to show it's working
};

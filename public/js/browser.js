const courseForm = document.querySelector('#course-form');
let courseData;

function showCourses() {
  const courseWrapper = document.querySelector('.courses');

  courseWrapper.innerHTML = '';

  for (let course of courseData) {
    courseWrapper.insertAdjacentHTML('beforeend', `
    <div class="course">
      <h3>${course.title}</h3>
    </div>
    `);
  }
}


async function getCourses() {
  const res = await fetch('/api/courses');
  courseData = await res.json();

  showCourses();
}

async function addCourse(eventObj) {
  eventObj.preventDefault();
  const courseInput = document.querySelector('#course-input');
  const courseValue = courseInput.value;

  fetch('/api/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: courseValue
    })
  }).then(res => res.json())
    .then(newCourseObj => {
      courseData.push(newCourseObj);
      showCourses();
      courseInput.value = '';
    })
}

courseForm.addEventListener('submit', addCourse);

getCourses();
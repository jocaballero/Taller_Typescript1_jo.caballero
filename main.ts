import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { students } from './students.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let infoTbody: HTMLElement = document.getElementById('datosPersonales')!;
let studentImage: HTMLElement = document.getElementById('studentImage')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const minCreditBox: HTMLInputElement = <HTMLInputElement> document.getElementById("min-credits")!;
const maxCreditBox: HTMLInputElement = <HTMLInputElement> document.getElementById("max-credits")!;
const btnfilterByCreditsRange: HTMLElement = document.getElementById("button-filterByCreditsRange")!;


btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCreditsRange.onclick = () => applyFilterByCreditsRange();

renderCoursesInTable(dataCourses);

renderInfoInTable(students);

renderImage(students);
 
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderInfoInTable(students: Student[]): void {
  console.log('Desplegando Datos Personales');
  students.forEach((student) => {
    let trElement = document.createElement("tbody");
    trElement.innerHTML = `<tr class="table-info">
                           <td>Código</td>
                           <td>${student.codigo}</td>
                           </tr>
                           <tr class="table-info">
                           <td>Cédula</td>
                           <td>${student.cedula}</td>
                           </tr>
                           <tr class="table-info">
                           <td>Edad</td>
                           <td>${student.edad} Años</td>
                           </tr>
                           <tr class="table-info">
                           <td>Dirección</td>
                           <td>${student.direccion}</td>
                           </tr>
                           <tr class="table-info">
                           <td>Teléfono</td>
                           <td>${student.telefono}</td>
                           </tr>`;
    infoTbody.appendChild(trElement);
  });
}

function renderImage(students: Student[]): void {
  console.log('Desplegando Imagen');
  students.forEach((student) => {
    let imgElement = document.createElement("img");
    imgElement.setAttribute("class", "img-fluid max-width: 100% height: auto");
    imgElement.setAttribute("src", "images/Memoji.jpeg");
    imgElement.setAttribute("alt", "Avatar");
    studentImage.appendChild(imgElement);
  });
}
 
function applyFilterByCreditsRange() {
  let min = minCreditBox.value;
  min = (min == null) ? '' : min;
  let max = maxCreditBox.value;
  max = (max == null) ? '' : max;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(min: string, max: string, courses: Course[]) {
  return min === '' && max === '' ? dataCourses : courses.filter( c => c.credits >= parseInt( min, 10 ) && c.credits <= parseInt( max, 10 ) );
}
 
function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}
import { dataCourses } from './dataCourses.js';
import { students } from './students.js';
var coursesTbody = document.getElementById('courses');
var infoTbody = document.getElementById('datosPersonales');
var studentImage = document.getElementById('studentImage');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var minCreditBox = document.getElementById("min-credits");
var maxCreditBox = document.getElementById("max-credits");
var btnfilterByCreditsRange = document.getElementById("button-filterByCreditsRange");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreditsRange.onclick = function () { return applyFilterByCreditsRange(); };
renderCoursesInTable(dataCourses);
renderInfoInTable(students);
renderImage(students);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderInfoInTable(students) {
    console.log('Desplegando Datos Personales');
    students.forEach(function (student) {
        var trElement = document.createElement("tbody");
        trElement.innerHTML = "<tr class=\"table-info\">\n                           <td>C\u00F3digo</td>\n                           <td>" + student.codigo + "</td>\n                           </tr>\n                           <tr class=\"table-info\">\n                           <td>C\u00E9dula</td>\n                           <td>" + student.cedula + "</td>\n                           </tr>\n                           <tr class=\"table-info\">\n                           <td>Edad</td>\n                           <td>" + student.edad + " A\u00F1os</td>\n                           </tr>\n                           <tr class=\"table-info\">\n                           <td>Direcci\u00F3n</td>\n                           <td>" + student.direccion + "</td>\n                           </tr>\n                           <tr class=\"table-info\">\n                           <td>Tel\u00E9fono</td>\n                           <td>" + student.telefono + "</td>\n                           </tr>";
        infoTbody.appendChild(trElement);
    });
}
function renderImage(students) {
    console.log('Desplegando Imagen');
    students.forEach(function (student) {
        var imgElement = document.createElement("img");
        imgElement.setAttribute("class", "img-fluid max-width: 100% height: auto");
        imgElement.setAttribute("src", "images/Memoji.jpeg");
        imgElement.setAttribute("alt", "Avatar");
        studentImage.appendChild(imgElement);
    });
}
function applyFilterByCreditsRange() {
    var min = minCreditBox.value;
    min = (min == null) ? '' : min;
    var max = maxCreditBox.value;
    max = (max == null) ? '' : max;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(min, max, courses) {
    return min === '' && max === '' ? dataCourses : courses.filter(function (c) { return c.credits >= parseInt(min, 10) && c.credits <= parseInt(max, 10); });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}

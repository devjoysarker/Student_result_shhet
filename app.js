
// GEt Elements

const student_form = document.getElementById('Student_form');
student_form.addEventListener('submit', function(e){
    e.preventDefault();
    let name      = student_form.querySelector("input[placeholder='Student Name']");
    let roll      = student_form.querySelector("input[placeholder='Roll Number']");
    let st_class  = student_form.querySelector("input[placeholder='Class']");
    let photo     = student_form.querySelector("input[placeholder='Photo']");
    let gender    = student_form.querySelector("input[name='gender']:checked");
    let bn        = student_form.querySelector("input[placeholder='Bangla']");
    let en        = student_form.querySelector("input[placeholder='English']");
    let math      = student_form.querySelector("input[placeholder='Math']");
    let s         = student_form.querySelector("input[placeholder='Science']");
    let ss        = student_form.querySelector("input[placeholder='Social Science']");
    let rel       = student_form.querySelector("input[placeholder='Religion']");
  if (name.value == '' || roll.value == ''|| st_class.value == '' ) {
      alert('All fields are required');
      // name.value.style.border = '1px soild red';
  }else{

    let storage_data = [];
  if (dataGet('result_apps')) {
      storage_data = dataGet('result_apps');
  }

  storage_data.push({

    name      : name.value,
    roll      : roll.value,
    st_class  : st_class.value,
    photo     : photo.value,
    gender    : gender.value,
    bn        : bn.value,
    en        : en.value,
    math      : math.value,
    s         : s.value,
    ss        : ss.value,
    rel       : rel.value
  });

  dataSend('result_apps', storage_data); 
  student_form.querySelector("input[placeholder='Student Name']").value = '';
  student_form.querySelector("input[placeholder='Roll Number']").value = '';
  student_form.querySelector("input[placeholder='Class']").value = '';
  student_form.querySelector("input[placeholder='Photo']").value = '';
  student_form.querySelector("input[name='gender']:checked");
  student_form.querySelector("input[placeholder='Bangla']").value = '';
  student_form.querySelector("input[placeholder='English']").value = '';
  student_form.querySelector("input[placeholder='Math']").value = '';
  student_form.querySelector("input[placeholder='Science']").value = '';
  student_form.querySelector("input[placeholder='Social Science']").value = '';
  student_form.querySelector("input[placeholder='Religion']").value = '';

  allStudentData();

  }

}); 

const data_list = document.querySelector('#data_list');
allStudentData();

function allStudentData(){
  let results = new Result();
  let all_data = dataGet('result_apps');
  let data = '';

  all_data.map((student, index) => {
    data += `<tr>
          <td>${ index + 1}</td>
          <td>${ student.name }</td>
          <td>${ student.roll }</td>
          <td>${ student.st_class }</td>
          <td>${ student.gender }</td>
          <td>${ results.finalResult( all_data[index].bn, all_data[index].en, all_data[index].math , all_data[index].s, all_data[index].ss, all_data[index].rel).finalResult  }</td>
          <td>${ results.finalResult( all_data[index].bn, all_data[index].en, all_data[index].math , all_data[index].s, all_data[index].ss, all_data[index].rel).finalCgpa  }</td>
          <td><img style = "width : 50px; height:50px; object-fit : cover; " src="${ student.photo }"></td>
          <td>
          <button class="btn btn-info btn-sm" onclick = "getSigleResult(${ index })" data-bs-toggle = "modal" data-bs-target= "#student_single_modal">View</button> 
          <button onclick="deleteStudent(${ index })" class="btn btn-danger btn-sm">Delete</button>
          </td>
          </tr> `;
  });
  data_list.innerHTML = data;
}


/**
 * Detleat Student Data
 */

function deleteStudent(id) {
  let storage_data = dataGet('result_apps');

  let conf = confirm('are you sure delete data?');
  if(conf){
    storage_data.splice(id, 1);
    dataSend('result_apps',storage_data);
    allStudentData();
  }else{
    return false;
  }



} 

const student_result_data = document.querySelector('.student-result-data');
function getSigleResult(index){
  
 let results = new Result();
 let storage_data = dataGet('result_apps');
  

  student_result_data.innerHTML = `
  <img class="shadow" src="${ storage_data[index].photo }" alt="">
  <h2>${storage_data[index].name}</h2>
  <hr>
  <table class="table table-bordered table-striped">
      <thead>
          <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Gpa</th>
              <th>Grade</th>
              <th>Cgpa</th>
              <th>Result</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>Bangla</td>
              <td>${storage_data[index].bn}</td>
              <td>${ results.result(storage_data[index].bn).gpa }</td>
              <td>${results.result(storage_data[index].bn).grade}</td>
              <td rowspan="6">
              ${ results.finalResult( storage_data[index].bn,storage_data[index].en,storage_data[index].math,storage_data[index].s,storage_data[index].ss,storage_data[index].rel ).finalCgpa }
              </td>
              <td rowspan="6">
              ${ results.finalResult( storage_data[index].bn,storage_data[index].en,storage_data[index].math,storage_data[index].s,storage_data[index].ss,storage_data[index].rel ).finalResult }
              </td>
          </tr>
          <tr>
              <td>English</td>
              <td>${ storage_data[index].en }</td>
              <td>${ results.result(storage_data[index].en).gpa }</td>
              <td>${ results.result(storage_data[index].en).grade }</td>
          </tr>
          <tr>
              <td>Math</td>
              <td>${ storage_data[index].math }</td>
              <td>${ results.result(storage_data[index].math).gpa}</td>
              <td>${ results.result(storage_data[index].math).grade }</td>
          </tr>
          <tr>
              <td>Science</td>
              <td>${ storage_data[index].s }</td>
              <td>${ results.result(storage_data[index].s).gpa }</td>
              <td>${ results.result(storage_data[index].s).grade }</td>
          </tr>
          <tr>
              <td>Social Science</td>
              <td>${ storage_data[index].ss }</td>
              <td>${ results.result(storage_data[index].ss).gpa }</td>
              <td>${ results.result(storage_data[index].ss).grade }</td>
          </tr>
          <tr>
              <td>Religion</td>
              <td>${ storage_data[index].rel }</td>
              <td>${ results.result(storage_data[index].rel).gpa }</td>
              <td>${ results.result(storage_data[index].rel).grade }</td>
          </tr>
      </tbody>
  </table>
 
  `;
}

















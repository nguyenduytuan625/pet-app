'use strict';

// Selecting elements
const tableBodyEl = document.getElementById('tbody');
const submitBtn = document.getElementById('submit-btn');
const typeInput = document.getElementById('input-type');
const breedInput = document.getElementById('input-breed');
const sideBar = document.getElementById('sidebar');

// Global variables
const breedArr = JSON.parse(getFromStorage("breedArr", '[]'));

// Functions
const validateData = function (data) {
  if (!data.name) { alert('Please type the name of the breed!'); }
  else if (!data.type) { alert('Please select the type!'); }
  else { return true; }
  return false;
}
const clearInput = function () {
  typeInput.value = '';
  breedInput.value = '';
  breedInput.placeholder = 'Input Breed';
};
const renderTableData = function (breedArr) {
  tableBodyEl.innerHTML = '';
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${i + 1}</td>
    <td>${breedArr[i].name}</td>
    <td>${breedArr[i].type}</td>
    <td>
      <button type="button" class="btn btn-danger" onclick="deletePet('${i}')">Delete</button>
		</td>
    `
    row.style.textTransform = 'capitalize';
    tableBodyEl.appendChild(row);
  }
};
const deletePet = function (index) {
  if (confirm('Are you sure?')) {
    breedArr.splice(index, 1);
    renderTableData(breedArr);
    saveToStorage("breedArr", JSON.stringify(breedArr));
  }
};
const init = function () {
  // localStorage.removeItem('breedArr');
  renderTableData(breedArr);
};
init();

// Activate sidebar
sideBar.addEventListener('click', function (e) {
  const clicked = e.target.closest('.sidebar-header');
  if (clicked) {
    sideBar.classList.toggle('active');
  }
});

// Submitting the form
submitBtn.addEventListener('click', function () {
  const data = {
    name: breedInput.value,
    type: typeInput.value,
  };
  // console.log(data);

  if (validateData(data)) {
    breedArr.push(data);
    clearInput();
    renderTableData(breedArr);
    saveToStorage("breedArr", JSON.stringify(breedArr));
  }
});
'use strict';

// Selecting elements
const idInput = document.getElementById("input-id");
const sideBar = document.getElementById('sidebar');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const submitBtn = document.getElementById('submit-btn');
const tableBodyEl = document.getElementById('tbody');
const breedInput = document.getElementById('input-breed');
const edittingForm = document.getElementById('container-form');

// Global variables
const petArr = JSON.parse(getFromStorage("petArr", '[]'));
const breedArr = JSON.parse(getFromStorage("breedArr", '[]'));
let ID;

// Functions
const findIndexById = function (petId) {
  return petArr.findIndex(item => item.id === petId);
};
const validateData = function (data) {
  if (!data.name) { alert("Please fill in Name"); }
  else if (!data.age && data.age !== 0) { alert("Please fill in Age!"); }
  else if (data.age < 1 || data.age > 15) { alert("Age must be between 1 and 15!"); }
  else if (!data.weight && data.weight !== 0) { alert("Please fill in Weight!"); }
  else if (data.weight < 1 || data.weight > 15) { alert("Weight must be between 1 and 15!"); }
  else if (!data.length && data.length !== 0) { alert("Please fill in Length!"); }
  else if (data.length < 1 || data.length > 100) { alert("Length must be between 1 and 100!"); }
  else if (!data.type) { alert("Please select Type!"); }
  else { return true; }
  return false;
}
const clearInput = function () {
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = '';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#fff';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
const renderTableData = function (petArr) {
  tableBodyEl.innerHTML = '';
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${petArr[i].id} </td>
    <td>${petArr[i].name} </td>
    <td>${petArr[i].age} </td>
    <td>${petArr[i].type} </td>
    <td>${petArr[i].weight} </td>
    <td>${petArr[i].length} </td>
    <td>${petArr[i].breed} </td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td>
      <i class="bi ${petArr[i].isVaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i>
    </td>
    <td>
      <i class="bi ${petArr[i].isDewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i>
    </td>
    <td>
      <i class="bi ${petArr[i].isSterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i>
    </td>
    <td>${petArr[i].date} </td>
    <td>
      <button type="button" class="btn btn-danger" onclick="startEditPet('${petArr[i].id}')">Edit</button>
		</td>
    `
    row.style.textTransform = 'capitalize';
    tableBodyEl.appendChild(row);
  }
};
const renderBreed = function (type) {
  breedInput.innerHTML = `<option value="">Select Breed</option>`;
  breedArr.filter(breed => breed.type === type)
    .forEach((breed) => {
      const option = document.createElement('option');
      option.innerHTML = `<option value='${breed.name.toLowerCase()}'>${breed.name}</option>`;
      breedInput.appendChild(option);
    });
};
const showEdittingForm = function (petId) {
  const index = findIndexById(petId);
  idInput.value = petId;
  nameInput.value = petArr[index].name;
  ageInput.value = petArr[index].age;
  typeInput.value = petArr[index].type;
  weightInput.value = petArr[index].weight;
  lengthInput.value = petArr[index].length;
  colorInput.value = petArr[index].color;
  vaccinatedInput.checked = petArr[index].isVaccinated;
  dewormedInput.checked = petArr[index].isDewormed;
  sterilizedInput.checked = petArr[index].isSterilized;
  renderBreed(petArr[index].type);
  breedInput.value = petArr[index].breed;
};
const init = function () {
  // localStorage.removeItem('petArr');
  renderTableData(petArr);
};
init();

// Editing pet
const startEditPet = function (petId) {
  edittingForm.classList.remove('hide');
  ID = petId;
  showEdittingForm(petId);
  // console.log(petId);
};

// Activate sidebar
sideBar.addEventListener('click', function (e) {
  const clicked = e.target.closest('.sidebar-header');
  if (clicked) {
    sideBar.classList.toggle('active');
  }
});

// Type handler
typeInput.addEventListener('click', function (e) {
  // console.log(e.target.value);
  renderBreed(e.target.value);
});

// Submitting the form
submitBtn.addEventListener('click', function () {
  const data = {
    id: ID,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: Number(weightInput.value),
    length: Number(lengthInput.value),
    color: colorInput.value,
    isVaccinated: vaccinatedInput.checked,
    isDewormed: dewormedInput.checked,
    isSterilized: sterilizedInput.checked,
    date: (new Date()).toLocaleDateString(),
    breed: breedInput.value,
  };
  // console.log(data);

  if (validateData(data)) {
    const index = findIndexById(ID);
    petArr.splice(index, 1, data);
    clearInput();
    edittingForm.classList.add('hide');
    renderTableData(petArr);
    saveToStorage("petArr", JSON.stringify(petArr));
  }
});
'use strict';

// Selecting elements
const sideBar = document.getElementById('sidebar');
const idInput = document.getElementById("input-id");
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
const healthyBtn = document.getElementById('healthy-btn');
const tableBodyEl = document.getElementById('tbody');
const breedInput = document.getElementById('input-breed');

// Activate sidebar
sideBar.addEventListener('click', function (e) {
  const clicked = e.target.closest('.sidebar-header');
  if (clicked) {
    sideBar.classList.toggle('active');
  }
});

// Global variables
const petArr = JSON.parse(getFromStorage("petArr", '[]'));
const breedArr = JSON.parse(getFromStorage("breedArr", '[]'));
let healthyCheck = false;

// Functions
const findIndexById = function (petId) {
  return petArr.findIndex(item => item.id === petId);
};
const validateData = function (data) {
  if (!data.id) { alert("Please fill in ID!"); }
  else if (findIndexById(data.id) !== -1) { alert("ID must be unique!"); }
  else if (!data.name) { alert("Please fill in Name"); }
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
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = '';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#fff';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  breedInput.value = '';
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
      <button type="button" class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button>
		</td>
    `
    row.style.textTransform = 'capitalize';
    tableBodyEl.appendChild(row);
  }
};
const deletePet = function (petId) {
  if (confirm('Are you sure?')) {
    const index = findIndexById(petId);
    if (index !== -1) {
      petArr.splice(index, 1);
      renderTableData(petArr);
      saveToStorage("petArr", JSON.stringify(petArr));
    }
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
const init = function () {
  // localStorage.removeItem('petArr');
  renderTableData(petArr);
};
init();

// Submitting the form
submitBtn.addEventListener('click', function () {
  const data = {
    id: idInput.value,
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
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
    saveToStorage("petArr", JSON.stringify(petArr));
  }
});

// Type handler
typeInput.addEventListener('click', function (e) {
  // console.log(e.target.value);
  renderBreed(e.target.value);
});

// Showing healthy pets
healthyBtn.addEventListener('click', function () {
  healthyCheck = healthyCheck ? false : true;
  if (healthyCheck) {
    const healthyPetArr = petArr.filter(item => item.isVaccinated && item.isDewormed && item.isSterilized);
    renderTableData(healthyPetArr);
    healthyBtn.textContent = 'Show All Pet';
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = 'Show Healthy Pet';
  }
});
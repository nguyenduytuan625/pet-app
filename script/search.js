'use strict';

// Selecting elements
const sideBar = document.getElementById('sidebar');
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById('input-name');
const typeInput = document.getElementById('input-type');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const findBtn = document.getElementById('find-btn');
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

// Functions
const findIndexById = function (petId) {
  return petArr.findIndex(item => item.id === petId);
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
    `
    row.style.textTransform = 'capitalize';
    tableBodyEl.appendChild(row);
  }
};
const renderBreed = function () {
  breedInput.innerHTML = `<option value="">Select Breed</option>`;
  breedArr.forEach((breed) => {
    const option = document.createElement('option');
    option.innerHTML = `<option value='${breed.name.toLowerCase()}'>${breed.name}</option>`;
    breedInput.appendChild(option);
  });
};
const init = function () {
  // localStorage.removeItem('petArr');
  // console.log(petArr);
  renderBreed();
};
init();

// Finding the form
findBtn.addEventListener('click', function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    isVaccinated: vaccinatedInput.checked,
    isDewormed: dewormedInput.checked,
    isSterilized: sterilizedInput.checked,
    breed: breedInput.value,
  };
  // console.log(data);
  const foundArr = petArr.filter(pet => (!data.id || data.id === pet.id) && (!data.name || data.name.toLowerCase() === pet.name.toLowerCase())
    && (!data.type || data.type === pet.type) && (!data.breed || data.breed === pet.breed)
    && (!data.isVaccinated || data.isVaccinated === pet.isVaccinated) && (!data.isDewormed || data.isDewormed === pet.isDewormed)
    && (!data.isSterilized || data.isSterilized === pet.isSterilized));
  renderTableData(foundArr);
});
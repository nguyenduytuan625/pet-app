'use strict';

// Selecting elements
const importBtn = document.getElementById('import-btn');
const exportBtn = document.getElementById('export-btn');
const fileInput = document.getElementById('input-file');

// Global variables
const petArr = JSON.parse(getFromStorage("petArr", '[]'));

// Functions
function saveStaticDataToFile() {
  const blob = new Blob([JSON.stringify(petArr)], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "static.json");
}
const validatePet = function (pet) {
  const samplePet = {
    id: '',
    name: '',
    age: 0,
    type: '',
    weight: 0,
    length: 0,
    color: '',
    isVaccinated: false,
    isDewormed: false,
    isSterilized: false,
    date: '',
    breed: '',
  };
  // console.log(Object.keys(samplePet));
  const properties1 = JSON.stringify(Object.keys(samplePet).sort());
  const properties2 = JSON.stringify(Object.keys(pet).sort());
  return properties1 === properties2;
}
const updateExistingPet = function (newPetArr) {
  newPetArr.forEach(newPet => {
    if (validatePet(newPet)) {
      const index = petArr.findIndex(pet => pet.id === newPet.id);
      // console.log(index);
      if (index === -1) { petArr.push(newPet); }
      else { petArr.splice(index, 1, newPet); }
    }
  });
  // console.log(petArr);
}

// Exporting a file
exportBtn.addEventListener('click', saveStaticDataToFile);

// Importing a file
importBtn.addEventListener('click', function () {
  // console.log(fileInput.files[0]);
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (e) {
      const newPetArr = JSON.parse(e.target.result ? e.target.result : '[]');
      // console.log(newPetArr);
      updateExistingPet(newPetArr);
      saveToStorage('petArr', JSON.stringify(petArr));
    };
  }
  fileInput.value = '';
});
'use strict';

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key, d) {
  return localStorage.getItem(key) ? localStorage.getItem(key) : d;
}
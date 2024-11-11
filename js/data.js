'use strict';
/* exported data, writeDataLS */
const data = readDataLS();
function writeDataLS() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}
function readDataLS() {
  const dataJSON = localStorage.getItem('data-storage');
  if (dataJSON !== null) {
    return JSON.parse(dataJSON);
  } else {
    return {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
  }
}

'use strict';
const $photoPreview = document.querySelector('#photo-preview');
const $photoUrl = document.querySelector('#photo-url');
const $entryForm = document.querySelector('form');
if (!$photoUrl || !$photoPreview || !$entryForm) {
  throw new Error('The $photoPreview or $photoUrl or $entryForm query failed');
}
$photoUrl.addEventListener('input', (event) => {
  const target = event.target;
  $photoPreview.setAttribute('src', target.value);
});
$entryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $entryForm.elements;
  const entryObj = {
    title: $formElements.title.value,
    photo_url: $formElements.photo_url.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(entryObj);
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  writeDataLS();
});

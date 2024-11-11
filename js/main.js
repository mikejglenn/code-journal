'use strict';
const $photoPreview = document.querySelector('#photo-preview');
const $photoUrl = document.querySelector('#photo-url');
if (!$photoUrl || !$photoPreview) {
  throw new Error('The $photoPreview or $photoUrl query failed');
}
$photoUrl.addEventListener('input', (event) => {
  const target = event.target;
  $photoPreview.setAttribute('src', target.value);
});

const $photoPreview = document.querySelector('#photo-preview');
const $photoUrl = document.querySelector('#photo-url');
if (!$photoUrl || !$photoPreview) {
  throw new Error('The $photoPreview or $photoUrl query failed');
}

$photoUrl.addEventListener('input', (event: Event) => {
  const target = event.target as HTMLInputElement;
  $photoPreview.setAttribute('src', target.value);
});

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo_url: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $photoPreview = document.querySelector('#photo_preview');
const $photoUrl = document.querySelector('#photo_url');
const $entryForm = document.querySelector('form') as HTMLFormElement;
if (!$photoUrl || !$photoPreview || !$entryForm) {
  throw new Error('The $photoPreview or $photoUrl or $entryForm query failed');
}

$photoUrl.addEventListener('input', (event: Event) => {
  const target = event.target as HTMLInputElement;
  $photoPreview.setAttribute('src', target.value);
});

$entryForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $entryForm.elements as FormElements;
  const entryObj: Entry = {
    title: $formElements.title.value,
    photo_url: $formElements.photo_url.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(entryObj);
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  writeData();
});

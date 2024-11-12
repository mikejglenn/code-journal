interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo_url: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

function renderEntry(entry: Entry): HTMLElement {
  const $domTreeEntryLi = document.createElement('li');
  $domTreeEntryLi.className = 'row';

  const $columnHalf1 = document.createElement('div');
  $columnHalf1.className = 'column-half';

  const $imgEntry = document.createElement('img');
  $imgEntry.src = entry.photo_url;

  const $columnHalf2 = document.createElement('div');
  $columnHalf2.className = 'column-half';

  const $h3Title = document.createElement('h3');
  $h3Title.innerHTML = entry.title;

  const $pNotes = document.createElement('p');
  $pNotes.innerHTML = entry.notes;

  $columnHalf1.appendChild($imgEntry);

  $columnHalf2.appendChild($h3Title);
  $columnHalf2.appendChild($pNotes);

  $domTreeEntryLi.appendChild($columnHalf1);
  $domTreeEntryLi.appendChild($columnHalf2);

  return $domTreeEntryLi;
}

const $photoPreview = document.querySelector('#photo_preview');
const $photoUrl = document.querySelector('#photo_url');
const $entryForm = document.querySelector('form') as HTMLFormElement;
const $ul = document.querySelector('ul');
if (!$photoUrl || !$photoPreview || !$entryForm || !$ul) {
  throw new Error(
    'The $photoPreview or $photoUrl or $entryForm or $ul query failed',
  );
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

document.addEventListener('DOMContentLoaded', () => {
  for (const entry of data.entries) {
    $ul.appendChild(renderEntry(entry));
  }
});

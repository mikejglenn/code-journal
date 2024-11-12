interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo_url: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $photoPreview = document.querySelector('#photo_preview');
const $photoUrl = document.querySelector('#photo_url');
const $entryForm = document.querySelector('form') as HTMLFormElement;
const $entriesUl = document.querySelector('ul');
const $noEntriesMessage = document.querySelector('#no-entries');
const $entryFormView = document.querySelector('[data-view="entry-form"]');
const $entriesView = document.querySelector('[data-view="entries"]');
if (
  !$photoUrl ||
  !$photoPreview ||
  !$entryForm ||
  !$entriesUl ||
  !$noEntriesMessage ||
  !$entryFormView ||
  !$entriesView
) {
  throw new Error(
    `The $photoPreview or $photoUrl or $entryForm or $ul or $noEntriesMessage or
     $entryFormView or $entriesView query failed`,
  );
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

function toggleNoEntries(): void {
  $noEntriesMessage?.classList.toggle('hidden');
}

function viewSwap(viewName: string): void {
  if (viewName === 'entry-form') {
    $entriesView?.classList.add('hidden');
    $entryFormView?.classList.remove('hidden');
  }
  if (viewName === 'entries') {
    $entryFormView?.classList.add('hidden');
    $entriesView?.classList.remove('hidden');
  }
  data.view = viewName;
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
  $entriesUl.appendChild(renderEntry(entryObj));
  viewSwap('entries');
  if ($noEntriesMessage.classList.contains('hidden')) {
    toggleNoEntries();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  for (const entry of data.entries) {
    $entriesUl.appendChild(renderEntry(entry));
  }
});

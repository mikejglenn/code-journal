'use strict';
const $photoPreview = document.querySelector('#photo_preview');
const $photoUrl = document.querySelector('#photo_url');
const $entryForm = document.querySelector('form');
const $entriesUl = document.querySelector('ul');
const $noEntriesMessage = document.querySelector('#no-entries');
const $entryFormView = document.querySelector('[data-view="entry-form"]');
const $entriesView = document.querySelector('[data-view="entries"]');
const $entriesAnchor = document.querySelector('#entries-anchor');
const $newEntry = document.querySelector('#new-entry');
const $entryFormTitle = document.querySelector('#entry-form-title');
const $deleteEntry = document.querySelector('#delete-button');
const $dialog = document.querySelector('dialog');
const $cancelModal = document.querySelector('.cancel-modal');
const $confirmModal = document.querySelector('.confirm-modal');
const $searchBox = document.querySelector('#search');
if (
  !$photoUrl ||
  !$photoPreview ||
  !$entryForm ||
  !$entriesUl ||
  !$noEntriesMessage ||
  !$entryFormView ||
  !$entriesView ||
  !$entriesAnchor ||
  !$newEntry ||
  !$entryFormTitle ||
  !$deleteEntry ||
  !$dialog ||
  !$cancelModal ||
  !$confirmModal ||
  !$searchBox
) {
  throw new Error(`The $photoPreview or $photoUrl or $entryForm or $ul or $noEntriesMessage or
     $entryFormView or $entriesView or $entriesAnchor or $newEntry or
     $entryFormTitle or $deleteEntry  or $dialog or $cancelModal or
     $confirmModal or $searchBox query failed`);
}
function renderEntry(entry) {
  const $domTreeEntryLi = document.createElement('li');
  $domTreeEntryLi.className = 'row';
  $domTreeEntryLi.dataset.entryId = `${entry.entryId}`;
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.className = 'column-half';
  const $imgEntry = document.createElement('img');
  $imgEntry.src = entry.photo_url;
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.className = 'column-half';
  const $h3Title = document.createElement('h3');
  $h3Title.textContent = entry.title;
  const $faPencil = document.createElement('i');
  $faPencil.className = 'fa-solid fa-pencil';
  const $pNotes = document.createElement('p');
  $pNotes.textContent = entry.notes;
  $columnHalf1.appendChild($imgEntry);
  $h3Title.appendChild($faPencil);
  $columnHalf2.appendChild($h3Title);
  $columnHalf2.appendChild($pNotes);
  $domTreeEntryLi.appendChild($columnHalf1);
  $domTreeEntryLi.appendChild($columnHalf2);
  return $domTreeEntryLi;
}
function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntriesMessage?.classList.remove('hidden');
    return;
  }
  if (data.entries.length > 0) {
    $noEntriesMessage?.classList.add('hidden');
  }
}
function viewSwap(viewName) {
  if (viewName === 'entry-form') {
    $entriesView?.classList.add('hidden');
    $entryFormView?.classList.remove('hidden');
  }
  if (viewName === 'entries') {
    $entryFormView?.classList.add('hidden');
    $entriesView?.classList.remove('hidden');
  }
  data.view = viewName;
  toggleNoEntries();
  writeData();
}
$photoUrl.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  $photoPreview.setAttribute('src', $eventTarget.value);
});
$entryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $entryForm.elements;
  if (data.editing === null) {
    const newEntryObj = {
      title: $formElements.title.value,
      photo_url: $formElements.photo_url.value,
      notes: $formElements.notes.value,
      entryId: data.nextEntryId,
    };
    data.nextEntryId++;
    data.entries.unshift(newEntryObj);
    $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
    $entriesUl.prepend(renderEntry(newEntryObj));
  }
  if (data.editing !== null) {
    const editEntryObj = {
      title: $formElements.title.value,
      photo_url: $formElements.photo_url.value,
      notes: $formElements.notes.value,
      entryId: data.editing.entryId,
    };
    for (const key in data.entries) {
      if (data.entries[key].entryId === editEntryObj.entryId) {
        data.entries[key] = editEntryObj;
        break;
      }
    }
    const $oldLi = document.querySelector(
      `[data-entry-id="${editEntryObj.entryId}"]`,
    );
    const $newLi = renderEntry(editEntryObj);
    $entriesUl.replaceChild($newLi, $oldLi);
    $entryFormTitle.textContent = 'New Entry';
    data.editing = null;
  }
  $entryForm.reset();
  writeData();
  viewSwap('entries');
  if (data.entries.length > 0) {
    toggleNoEntries();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  viewSwap(data.view);
  if (data.entries.length > 0) {
    toggleNoEntries();
  }
  for (const entry of data.entries) {
    $entriesUl.appendChild(renderEntry(entry));
  }
});
$entriesAnchor.addEventListener('click', () => {
  viewSwap('entries');
});
$newEntry.addEventListener('click', () => {
  $deleteEntry?.classList.add('hidden');
  $entryFormTitle.textContent = 'New Entry';
  $entryForm.reset();
  viewSwap('entry-form');
});
$entriesUl.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if ($eventTarget.tagName === 'I') {
    $deleteEntry?.classList.remove('hidden');
    viewSwap('entry-form');
    const $closestLi = $eventTarget.closest('li');
    for (const entry of data.entries) {
      if (`${entry.entryId}` === $closestLi?.dataset.entryId) {
        data.editing = entry;
        const $formElements = $entryForm.elements;
        $formElements.title.value = data.editing.title;
        $formElements.photo_url.value = data.editing.photo_url;
        $formElements.notes.value = data.editing.notes;
        $entryFormTitle.textContent = 'Edit Entry';
        break;
      }
    }
  }
});
$deleteEntry.addEventListener('click', () => {
  $dialog.showModal();
});
$cancelModal.addEventListener('click', () => {
  $dialog.close();
});
$confirmModal.addEventListener('click', () => {
  for (const key in data.entries) {
    if (data.entries[key].entryId === data.editing?.entryId) {
      data.entries.splice(+key, 1);
      const $deleteLi = document.querySelector(
        `[data-entry-id="${data.editing.entryId}"]`,
      );
      $deleteLi.remove();
      if (data.entries.length === 0) {
        toggleNoEntries();
      }
      $dialog.close();
      data.editing = null;
      viewSwap('entries');
      break;
    }
  }
});
$searchBox.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  const searchInput = $eventTarget.value;
  if (searchInput === '') {
    for (const entry of data.entries) {
      const $showLi = document.querySelector(
        `[data-entry-id="${entry.entryId}"]`,
      );
      $showLi.classList.remove('hidden');
    }
    return;
  }
  for (const entry of data.entries) {
    if (
      !entry.title.includes(searchInput) &&
      !entry.notes.includes(searchInput)
    ) {
      const $hideLi = document.querySelector(
        `[data-entry-id="${entry.entryId}"]`,
      );
      $hideLi.classList.add('hidden');
    }
  }
});

interface Entry {
  title: string;
  photo_url: string;
  notes: string;
  entryId: number;
  tags: string[];
}

interface Data {
  view: string;
  entries: Entry[];
  editing: Entry | null;
  nextEntryId: number;
}

const data: Data = readData();

function writeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): Data {
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

interface Entry {
  title: string;
  photo_url: string;
  notes: string;
  entryId: number;
}

interface Data {
  view: string;
  entries: Entry[];
  editing: null;
  nextEntryId: number;
}

const data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

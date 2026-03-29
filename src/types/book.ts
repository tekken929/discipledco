export interface BookSection {
  number: number;
  title: string;
  chapterRange: string;
  summary: string;
  keyVerse: string;
  verseReference: string;
}

export interface Book {
  id: string;
  name: string;
  order: number;
  chapters: number;
  type: string;
  testament: 'Old Testament' | 'New Testament';
  overview: string[];
  written: string;
  timePeriod: string;
  author: string;
  authorDescription: string;
  bibleVersion: string;
  imageUrl?: string;
  structure: BookSection[];
}

export interface BibleReference {
  book: string;
  chapter: number;
  verse: string;
  text: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  references: BibleReference[];
}

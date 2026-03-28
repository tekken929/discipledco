export interface BibleReference {
  book: string;
  chapter: number;
  verse: string;
  text: string;
  summary?: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  references: BibleReference[];
  order: number;
}

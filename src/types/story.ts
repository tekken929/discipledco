export interface StoryReference {
  book: string;
  chapter: number;
  verse: string;
  text: string;
}

export interface StorySection {
  type: 'body' | 'scripture' | 'heading' | 'subheading' | 'emphasis';
  text: string;
  reference?: string;
  verseText?: string;
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  shortSummary: string;
  icon: string;
  order: number;
  references: StoryReference[];
  content?: StorySection[];
}

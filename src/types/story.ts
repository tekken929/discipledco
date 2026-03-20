export interface StoryReference {
  book: string;
  chapter: number;
  verse: string;
  text: string;
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  icon: string;
  order: number;
  references: StoryReference[];
}

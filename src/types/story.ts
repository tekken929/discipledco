export interface StoryVerse {
  chapter: number;
  verses: string;
  text: string;
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  book: string;
  icon: string;
  order: number;
  scripture: StoryVerse[];
}

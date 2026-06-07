export interface BibleReference {
  book: string;
  chapter: number;
  verse: string;
  text: string;
  summary?: string;
  translation?: string;
}

export interface Topic {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  shortDescription: string;
  expandedContent?: string;
  bodyContent?: string[];
  whatWeLearns?: string[];
  familyConversation?: string;
  prayer?: string;
  icon: string;
  references: BibleReference[];
  order: number;
}

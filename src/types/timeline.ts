export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  category: 'creation' | 'jewish' | 'catholic' | 'protestant' | 'modern';
  description: string;
  details: string[];
  relatedLinks?: {
    title: string;
    url: string;
  }[];
}

export interface TimelineSection {
  id: string;
  title: string;
  description: string;
  category: 'creation' | 'jewish' | 'catholic' | 'protestant' | 'modern';
}

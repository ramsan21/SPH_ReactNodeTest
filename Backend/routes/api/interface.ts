export interface Item {
  author: string;
  title: string;
  content: string;
  link?: string;
  published: Date;
  edited: Date;
  created: Date;
  feed?: {
    source: string;
    link: string;
    name: string;
  };
}

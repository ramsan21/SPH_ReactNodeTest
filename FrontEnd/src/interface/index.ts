export interface Item {
  title: string;
  author: string;
  content: string;
  created: string;
  edited: string;
  published: string;
}

export interface Items {
  items: {
    item: Item;
    items: Item[];
    loading: boolean;
  };
}

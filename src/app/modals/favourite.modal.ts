export interface Favourite {
  items: Array<FavouriteNews>;
}

export interface FavouriteNews {
  title: string;
  url: string;
  description: string;
}

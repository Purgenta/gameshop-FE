export type Game = {
  id: number;
  gameImages: GameImages[];
  category: Category;
  price: number;
  description: string;
  avgRating: null | number;
  title: string;
  publisher: Publisher;
  releaseYear: number;
};
export type GameImages = {
  id: number;
  url: string;
};
export type Publisher = {
  publisher_id: number;
  name: string;
};
export type Category = {
  id: number;
  name: string;
  description: string;
};

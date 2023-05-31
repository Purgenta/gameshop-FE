export type Game = {
  id: number;
  gameImages: GameImages[];
  price: number;
  title: string;
  publisher: Publisher;
};
export type Category = {
  name: string;
  id: number;
};
type GameImages = {
  id: number;
  url: string;
};
type Publisher = {
  id: number;
  name: string;
};

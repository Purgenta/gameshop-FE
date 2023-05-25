export type Game = {
  id: number;
  gameImages: GameImages[];
  price: number;
  title: string;
};
export type Category = {
  name: string;
  id: number;
};
type GameImages = {
  id: number;
  url: string;
};

import { Game } from "./game";
type OrderStatus = "ISSUED_FOR_DELIVERY" | "COMPLETED" | "CANCELED";
export type OrderReview = {
  review: string;
  id: number;
  deliveryRating: number;
  serviceRating: number;
};
export type Order = {
  id: number;
  issued_at: string;
  cart: {
    id: number;
    cartItems: Array<{
      id: number;
      game: Game;
      quantity: number;
    }>;
  };
  orderStatus: OrderStatus;
  orderReview: OrderReview | null;
};
